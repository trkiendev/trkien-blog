namespace trkienBlog.Application.Security
{
        public interface IPasswordHaser
        {
                string Hash(string password);
                bool Verify(string password, string hash);
        }
}
