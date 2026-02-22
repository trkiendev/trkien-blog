using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Options;
using trkienBlog.Application.FileStorage.Services;
using trkienBlog.Infrastructure.FileStorages;

namespace trkienBlog.Infrastructure.FileStorage.Services
{
        public sealed class R2FileStorageService : IFileStorageService
        {
                private readonly IAmazonS3 _s3;
                private readonly R2Options _options;
                public R2FileStorageService(IAmazonS3 s3, IOptions<R2Options> options)
                {
                        _s3 = s3;
                        _options = options.Value;
                }

                public async Task<string> UploadAsync(Stream stream, string fileName, string contentType)
                {
                        var key = $"topics/{DateTime.UtcNow:yyyy/MM}/{Guid.NewGuid()}_{fileName}";

                        using var ms = new MemoryStream();
                        await stream.CopyToAsync(ms);
                        ms.Position = 0;

                        var request = new PutObjectRequest
                        {
                                BucketName = _options.BucketName,
                                Key = key,
                                InputStream = ms,
                                ContentType = contentType,
                                AutoCloseStream = false,
                        };

                        request.Headers.ContentLength = ms.Length; 
                        request.DisablePayloadSigning = true;

                        await _s3.PutObjectAsync(request);
                        return key;
                }
        }
}
