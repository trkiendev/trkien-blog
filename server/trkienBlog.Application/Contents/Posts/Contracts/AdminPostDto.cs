using trkienBlog.Application.Contents.Tags.Contracts;
using trkienBlog.Domain.Enums;

namespace trkienBlog.Application.Contents.Posts.Contracts
{
        public sealed record AdminPostDetailDto
        {
                public Guid Id { get; init; }
                public string Title { get; init; } = default!;
                public string Slug { get; init; } = default!;
                public string ContentJson { get; init; } = default!;
                public Guid TopicId { get; init; }
                public IReadOnlyList<Guid> TagIds { get; init; } = new List<Guid>();
                public IReadOnlyList<TagLookupDto> TagLookups { get; set; } = new List<TagLookupDto>();
                public string? ThumbnailKey { get; init; }
                public string? ThumbnailUrl { get; set; }
                public PostStatus Status { get; init; }
                public DateTime CreatedAt { get; init; }
                public DateTime? PublishedAt { get; init; }
        }
}
