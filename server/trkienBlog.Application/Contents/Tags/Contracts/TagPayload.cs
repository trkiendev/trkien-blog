namespace trkienBlog.Application.Contents.Tags.Contracts
{
        public sealed record TagPayload
        {
                public string Name { get; init; } = default!;
                public string Slug { get; init; } = default!;  
        }
}
