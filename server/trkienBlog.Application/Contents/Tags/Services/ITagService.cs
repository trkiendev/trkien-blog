using trkienBlog.Application.Contents.Tags.Contracts;

namespace trkienBlog.Application.Contents.Tags.Services
{
        public interface ITagService
        {
                Task<IReadOnlyList<TagTableDto>> GetTable(CancellationToken cancellation);
                Task<IReadOnlyList<TagLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task<TagDto> CreateAsync(string name, string slug, CancellationToken cancellation);
        }
}
