using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Tags.Repositories
{
        public interface ITagRepository
        {
                Task<IReadOnlyList<TagTableDto>> GetTableAsync(CancellationToken cancellation);
                Task<IReadOnlyList<TagLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task AddAsync(Tag tag, CancellationToken cancellation);

        }
}
