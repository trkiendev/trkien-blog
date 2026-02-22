namespace trkienBlog.Application.Contents.Topics.Contracts
{
        public sealed record TopicDto
        {
                public Guid Id { get; init; }
                public string Name { get; init; } = default!;
                public string? imageUrl { get; init; }
        }
}
