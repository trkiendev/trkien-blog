using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Topics
{
        public interface ITopicRepository
        {
                #region READ
                Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation);
                Task<bool> ExistByNameAsync(string name, CancellationToken cancellation);
                Task<List<Topic>> ListAllAsync(CancellationToken cancellation);
                Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation);
                Task<List<TopicLookupDto>> ListLookupAsync(CancellationToken cancellation);
                #endregion

                #region WRITE
                Task AddAsync(Topic topic, CancellationToken cancellation);
                #endregion
        }
}
