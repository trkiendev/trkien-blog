using trkienBlog.Application.Security;

namespace trkienBlog.Infrastructure.Security
{
        public sealed class BCryptPasswordHasher : IPasswordHaser
        {
                public string Hash(string password)
                        => BCrypt.Net.BCrypt.HashPassword(password);

                public bool Verify(string password, string hash)
                        => BCrypt.Net.BCrypt.Verify(password, hash);
        }
}

