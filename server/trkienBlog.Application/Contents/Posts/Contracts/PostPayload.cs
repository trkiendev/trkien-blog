using Microsoft.AspNetCore.Http;

namespace trkienBlog.Application.Contents.Posts.Contracts
{
        public sealed record PostPayload
        {
                public string Title { get; init; } = default!;
                public string Slug { get; init; } = default!;
                public string ContentJson { get; init; } = default!;
                public Guid TopicId { get; init; }
                public IFormFile? Thumbnail { get; set; }
                public List<Guid> TagIds { get; init; } = [];   
        }
}
