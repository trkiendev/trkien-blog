namespace trkienBlog.Application.Users.Contracts
{
        public sealed record UserPayload
        {
                public string UserName { get; set; } = default!;
                public string Password { get; set; } = default!;
        }
}
