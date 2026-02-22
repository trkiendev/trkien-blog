using Microsoft.Extensions.Options;
using trkienBlog.Application.FileStorages.Services;

namespace trkienBlog.Infrastructure.FileStorages.Services
{
        public sealed class R2FileUrlBuilderService : IFileUrlBuilder
        {
                private readonly R2Options _options;
                public R2FileUrlBuilderService(IOptions<R2Options> options)
                {
                        _options = options.Value;     
                }

                public string? Build(string? imageKey)
                {
                        if (imageKey is null) return null;

                        return $"{_options.PublicBaseUrl}/{imageKey}";
                }

        }
}
