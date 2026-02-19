using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Users.Repositories
{
        public interface IUserRepository
        {
                Task AddAsync(User user, CancellationToken cancellation);
                Task<bool> ExistUserByUsernameAysnc(string username, CancellationToken cancellation);
                Task<User?> GetByUsernameAsync(string username, CancellationToken cancellation);
        }
}
