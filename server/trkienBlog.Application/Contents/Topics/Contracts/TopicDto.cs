namespace trkienBlog.Application.Contents.Topics.Contracts
{
        public sealed record TopicDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string? imageUrl { get; init; }
        }
        
        public sealed record TopicLookupDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string? ImageKey { get; init; }  
                public string? ImageUrl { get; set; }
        }
}
