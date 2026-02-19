using trkienBlog.Application.Auth.Contracts;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Application.Auth.Services
{
        public interface ITokenService
        {
                TokenResult GenerateAccessToken(User user);
        }
}
