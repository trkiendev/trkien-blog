namespace trkienBlog.Application.Auth.Contracts
{
        public sealed record AuthResult(
                string AccessToken,
                DateTime ExpireAt
        );
}
