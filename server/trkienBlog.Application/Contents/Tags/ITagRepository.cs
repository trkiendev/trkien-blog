using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Tags
{
        public interface ITagRepository
        {
                #region Read
                // Validations
                Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation);
                Task<bool> ExistByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellation);

                // DTOs
                Task<IReadOnlyList<TagTableDto>> GetTableAsync(CancellationToken cancellation);
                Task<IReadOnlyList<TagLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task<IReadOnlyList<TagLookupDto>> ListLookupByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellation);
                #endregion

                #region Create
                Task AddAsync(Tag tag, CancellationToken cancellation);
                #endregion
        }
}
