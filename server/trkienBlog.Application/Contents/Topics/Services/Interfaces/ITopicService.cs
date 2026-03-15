using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Application.FileStorages.Contracts;

namespace trkienBlog.Application.Contents.Topics.Services.Interfaces
{
        public interface ITopicService
        {
                Task<TopicDto?> GetByIdAsync(Guid id, CancellationToken cancellation);
                Task<IReadOnlyList<TopicDto>> ListAllAsync(CancellationToken cancellation);
                Task<IReadOnlyList<TopicLookupDto>> ListLookupAsync(CancellationToken cancellation);
                Task<IDictionary<Guid, TopicLookupDto>> DictLookupAsync(IEnumerable<Guid> ids, CancellationToken cancellation);
                Task<TopicDto> CreateAsync(string name, FileUploadDto? image, CancellationToken cancellation);
        }
}
