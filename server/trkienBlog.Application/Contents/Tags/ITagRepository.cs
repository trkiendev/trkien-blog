using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Tags
{
        public interface ITagRepository
        {
                Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation);
                Task<bool> ExistByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellation);
                Task<IReadOnlyList<TagTableDto>> GetTableAsync(CancellationToken cancellation);
                Task<IReadOnlyList<TagLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task AddAsync(Tag tag, CancellationToken cancellation);

        }
}
