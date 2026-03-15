using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Domain.Enums;

namespace trkienBlog.Application.Contents.Posts.Contracts
{
        public sealed record PostDto
        {
                public Guid Id { get; init; }
                public string Title { get; init; } = default!;
                public string Slug { get; init; } = default!;
                public string ContentJson { get; init;  } = default!;
                public Guid TopicId { get; init; }
                public IReadOnlyList<Guid> TagIds { get; init; } = new List<Guid>();    
        }

        public sealed record PostTableDto
        {
                public Guid Id { get; init; }
                public string Title { get; init; } = default!;
                public Guid TopicId { get; init; }
                public TopicLookupDto? Topic { get; set; } 
                public IReadOnlyList<Guid> TagIds { get; init; } = new List<Guid>();
                public string? ThumbnailKey { get; init; }
                public string? ThumbnailUrl { get; set; }
                public PostStatus Status { get; init; }
                public DateTime CreatedAt { get; init; }
                public DateTime? PublishedAt { get; init; }
        }

        public sealed record PostDetailDto
        {
                public Guid Id { get; init; }
                public string Title { get; init; } = default!;
                public string ContentJson { get; init; } = default!;
                public Guid TopicId { get; init; }
                public IReadOnlyList<Guid> TagIds { get; init; } = new List<Guid>();
                public string? ThumbnailKey { get; init; }
                public string? ThumbnailUrl { get; set; }
                public PostStatus Status { get; init; }
                public DateTime CreatedAt { get; init; }
                public DateTime? PublishedAt { get; init; }
        }
}
