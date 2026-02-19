namespace trkienBlog.Application.Auth.Contracts
{
        public sealed record LoginPayload
        {
                public string Username { get; init; } = default!;
                public string Password { get; init; } = default!;
        }
}
