namespace trkienBlog.Application.Auth.Contracts
{
        public sealed record TokenResult(
                string AccessToken,
                DateTime ExpireAt
        );
}
