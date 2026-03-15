using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Topics
{
        public interface ITopicRepository
        {
                #region READ
                // Validations
                Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation);
                Task<bool> ExistByNameAsync(string name, CancellationToken cancellation);

                // Entity
                Task<List<Topic>> ListAllAsync(CancellationToken cancellation);

                // Properties
                Task<Dictionary<Guid, string>> DictNameAsync(IEnumerable<Guid> ids, CancellationToken cancellation);

                // DTOs
                Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation);
                Task<List<TopicLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task<IDictionary<Guid, TopicLookupDto>> DictLookupByIdsAsync(IEnumerable<Guid> ids, CancellationToken cancellation);
                #endregion

                #region WRITE
                Task AddAsync(Topic topic, CancellationToken cancellation);
                #endregion
        }
}
