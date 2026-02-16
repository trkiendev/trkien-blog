namespace trkienBlog.Domain.Entities
{
        public sealed class User
        {
                #region Constructor
                private User() { }
                public User(string username, string passwordHash) {
                        Id = Guid.NewGuid();
                        Username = username;
                        PasswordHash = passwordHash;    
                }
                #endregion

                public Guid Id { get; private set; }
                public string Username { get; private set; } = default!;
                public string PasswordHash { get; private set; } = default!;
        }
}
