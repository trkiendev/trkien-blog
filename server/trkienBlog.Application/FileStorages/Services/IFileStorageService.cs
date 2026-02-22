namespace trkienBlog.Application.FileStorage.Services
{
        public interface IFileStorageService
        {
                Task<string> UploadAsync(Stream stream, string fileName, string contentType);
        }
}
