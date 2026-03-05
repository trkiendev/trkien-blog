using trkienBlog.Application.Contents.Tags.Contracts;

namespace trkienBlog.Application.Contents.Tags.Services
{
        public interface ITagService
        {
                Task<TagDto> CreateAsync(string name, string slug, CancellationToken cancellation);
        }
}
