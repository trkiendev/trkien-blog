using trkienBlog.Domain.Exceptions;

namespace trkienBlog.Domain.Entities
{
        public class Topic
        {
                #region Constructor
                private Topic() { }
                public Topic(string name, string? imageKey)
                {
                        if (string.IsNullOrEmpty(name))
                                throw new DomainException("Name is required");

                        Id = Guid.NewGuid();
                        Name = name.Trim();
                        ImageKey = imageKey is not null ? imageKey.Trim() : null;
                        CreatedAt = DateTime.UtcNow;
                }

                #endregion

                #region Properties
                public Guid Id { get; private set; }
                public string Name { get; private set; } = default!;
                public string? ImageKey { get; private set; } 
                public DateTime CreatedAt { get; private set; } = default!;
                #endregion
        }
}
