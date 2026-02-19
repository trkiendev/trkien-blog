using trkienBlog.Domain.Exceptions;

namespace trkienBlog.Domain.Entities
{
        public sealed class User
        {
                #region Constructor
                private User() { }
                public User(string username, string passwordHash) {
                        if (string.IsNullOrWhiteSpace(username))
                                throw new DomainException("Username is required");

                        Id = Guid.NewGuid();
                        Username = username;
                        PasswordHash = passwordHash;    
                        CreatedAt = DateTime.UtcNow;
                }
                #endregion

                public Guid Id { get; private set; }
                public string Username { get; private set; } = default!;
                public string PasswordHash { get; private set; } = default!;
                public DateTime CreatedAt { get; private set; }
        }
}
