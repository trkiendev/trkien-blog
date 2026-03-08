namespace trkienBlog.Application.Contents.Tags.Contracts
{
        public sealed record TagDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string Slug { get; init; } = default!;
                public bool IsActive { get; init; }     
                public bool IsVisible { get; init; }       
                public int DisplayOrder { get; init; }
                public DateTime CreatedAt { get; init; }
        }

        public sealed record TagTableDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string Slug { get; init; } = default!;
                public bool IsActive { get; init; }
                public bool IsVisible { get; init; }
        }

        public sealed record TagBriefDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string Slug { get; init; } = default!;
        }
}
