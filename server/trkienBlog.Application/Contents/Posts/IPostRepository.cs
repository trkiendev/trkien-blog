using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Posts
{
        public interface IPostRepository
        {
                Task AddAsync(Post post, CancellationToken cancellation);
        }
}
