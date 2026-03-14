namespace trkienBlog.Domain.Common
{
        public abstract class AuditableEntity<TId> : AggregateRoot<TId>
        {
                public DateTime CreatedAt { get; protected set; }
                public DateTime? UpdatedAt {  get; protected set; }
                public DateTime? DeletedAt { get; protected set; }

                protected AuditableEntity() {
                        CreatedAt = DateTime.UtcNow;
                }

                protected void Update()
                {
                        UpdatedAt = DateTime.UtcNow;    
                }

                protected void Delete()
                {
                        DeletedAt = DateTime.UtcNow;    
                }
        }
}
