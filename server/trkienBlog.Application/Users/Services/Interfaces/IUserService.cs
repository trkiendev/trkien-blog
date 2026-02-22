using trkienBlog.Application.Users.Contracts;

namespace trkienBlog.Application.Users.Services.Interfaces
{
        public interface IUserService
        {
                Task CreateAsync(UserPayload payload, CancellationToken cancellation);
        }
}
