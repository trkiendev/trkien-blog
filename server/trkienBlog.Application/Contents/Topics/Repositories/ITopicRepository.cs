using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Topics.Repositories
{
        public interface ITopicRepository
        {
                Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation);
                Task<List<Topic>> ListAllAsync(CancellationToken cancellation);
                Task<bool> ExistByNameAsync(string name, CancellationToken cancellation);
                Task AddAsync(Topic topic, CancellationToken cancellation);
        }
}
