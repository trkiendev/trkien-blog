using trkienBlog.Domain.Common;
using trkienBlog.Domain.Exceptions;

namespace trkienBlog.Domain.Entities.Content
{
        public sealed class Topic : AggregateRoot<Guid>
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
                public string Name { get; private set; } = default!;
                public string? ImageKey { get; private set; } 
                public DateTime CreatedAt { get; private set; } = default!;
                #endregion
        }
}
