namespace trkienBlog.Application.FileStorages.Services
{
        public interface IFileUrlBuilder
        {
                string? Build(string? imageKey);
        }
}
