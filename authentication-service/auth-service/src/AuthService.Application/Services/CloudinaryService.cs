using AuthService.Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Configuration;

namespace AuthService.Application.Services;

public class CloudinaryService(IConfiguration configuration) : ICloudinaryService
{
    private readonly Cloudinary _cloudinary = new(new Account(
        configuration["CloudinarySettings:CloudName"],
        configuration["CloudinarySettings:ApiKey"],
        configuration["CloudinarySettings:ApiSecret"]
    ));

    private string GetBaseUrl()
    {
        var baseUrl = configuration["CloudinarySettings:BaseUrl"]
                      ?? "https://res.cloudinary.com/dqx1m6nxh/image/upload/";

        return baseUrl.TrimEnd('/') + "/";
    }

    private string GetDefaultAvatarPath()
    {
        return (configuration["CloudinarySettings:DefaultAvatarPath"]
                ?? "auth_service/profiles/avatarDefault-1749508519496_oam3k3")
            .Trim()
            .TrimStart('/');
    }

    public async Task<string> UploadImageAsync(IFileData imageFile, string fileName)
    {
        try
        {
            using var stream = new MemoryStream(imageFile.Data);

            var folder = configuration["CloudinarySettings:Folder"]
                         ?? "auth_service/profiles";

            var cleanName = Path.GetFileNameWithoutExtension(fileName);
            var publicId = $"{folder}/{cleanName}";

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(imageFile.FileName, stream),
                PublicId = publicId,
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                throw new InvalidOperationException(
                    $"Error uploading image: {uploadResult.Error.Message}"
                );
            }

            return $"v{uploadResult.Version}/{uploadResult.PublicId}.{uploadResult.Format}";
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                $"Failed to upload image to Cloudinary: {ex.Message}",
                ex
            );
        }
    }

    public async Task<bool> DeleteImageAsync(string fileName)
    {
        try
        {
            var withoutVersion = fileName.Contains('/')
                ? string.Join('/', fileName.Split('/').Skip(1))
                : fileName;

            var withoutExtension = Path.Combine(
                Path.GetDirectoryName(withoutVersion) ?? string.Empty,
                Path.GetFileNameWithoutExtension(withoutVersion)
            ).Replace("\\", "/");

            var deleteParams = new DelResParams
            {
                PublicIds = [withoutExtension]
            };

            var result = await _cloudinary.DeleteResourcesAsync(deleteParams);
            return result.Deleted?.ContainsKey(withoutExtension) == true;
        }
        catch
        {
            return false;
        }
    }

    public string GetDefaultAvatarUrl()
    {
        var defaultPath = GetDefaultAvatarPath();

        if (!defaultPath.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
        {
            defaultPath += ".png";
        }

        return $"{GetBaseUrl()}{defaultPath}";
    }

    public string GetFullImageUrl(string imagePath)
    {
        if (string.IsNullOrWhiteSpace(imagePath))
        {
            return GetDefaultAvatarUrl();
        }

        var normalizedPath = imagePath.Trim();

        if (Uri.TryCreate(normalizedPath, UriKind.Absolute, out var absoluteUri)
            && (absoluteUri.Scheme == Uri.UriSchemeHttp || absoluteUri.Scheme == Uri.UriSchemeHttps))
        {
            return normalizedPath;
        }

        normalizedPath = normalizedPath.TrimStart('/');

        if (string.Equals(normalizedPath, GetDefaultAvatarPath(), StringComparison.OrdinalIgnoreCase)
            && !normalizedPath.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
        {
            normalizedPath += ".png";
        }

        if (normalizedPath.StartsWith("v", StringComparison.OrdinalIgnoreCase))
        {
            return $"{GetBaseUrl()}{normalizedPath}";
        }

        return $"{GetBaseUrl()}w_400,h_400,c_fill,g_auto,q_auto,f_auto/{normalizedPath}";
    }
}
