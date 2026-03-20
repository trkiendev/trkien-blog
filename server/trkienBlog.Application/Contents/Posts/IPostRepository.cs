using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Posts
{
        public interface IPostRepository
        {
                #region GET
                Task<bool> ExistByIdAsync(Guid id, CancellationToken cancellation);
                Task<Post?> GetByIdAsync(Guid id, CancellationToken cancellation);
                Task<IReadOnlyList<PostTableDto>> GetTableAsync(CancellationToken cancellation);
                Task<AdminPostDetailDto?> GetDetailByIdAsync(Guid id, CancellationToken cancellation);
                #endregion

                #region CREATE
                Task Add(Post post);
                #endregion

                #region UPDATE
                Task Update(Post post);
                #endregion
        }
}
