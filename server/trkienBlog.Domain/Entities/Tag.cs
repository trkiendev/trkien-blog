namespace trkienBlog.Domain.Entities
{
        public sealed class Tag
        {
                #region Constructor
                private Tag() { }
                public Tag(string name, string slug)
                {
                        Id = Guid.NewGuid();
                        Name = name.Trim();
                        Slug = slug.Trim();

                }
                #endregion

                #region Properties
                public Guid Id { get; private set; }
                public string Name { get; private set; } = default!;
                public string Slug { get; private set; } = default!;
                public bool IsActive { get; private set; } = true;
                public bool IsVisible { get; private set; } = true;
                public int DisplayOrder { get; private set; } = 0;
                public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
                #endregion

                #region Behaviors
                public void Hide() => IsVisible = false;      
                public void Show() => IsVisible = true;
                public void Deactive() => IsActive = false;
                public void Activate() => IsActive = true;
                public void SetDisplayOrder(int order) => DisplayOrder = order;
                #endregion
        }
}
