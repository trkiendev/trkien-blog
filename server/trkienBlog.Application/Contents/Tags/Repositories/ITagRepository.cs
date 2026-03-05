using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Contents.Tags.Repositories
{
        public interface ITagRepository
        {
                Task AddAsync(Tag tag, CancellationToken cancellation);
        }
}
