using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Posts
{
        public interface IPostRepository
        {
                Task<IReadOnlyList<PostTableDto>> GetTableAsync(CancellationToken cancellation);
                Task AddAsync(Post post, CancellationToken cancellation);
        }
}
