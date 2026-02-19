using trkienBlog.Application.Auth.Contracts;

namespace trkienBlog.Application.Auth.Services
{
        public interface IAuthService
        {
                Task<AuthResult> LoginAsync(LoginPayload payload, CancellationToken cancellation);
        }
}
