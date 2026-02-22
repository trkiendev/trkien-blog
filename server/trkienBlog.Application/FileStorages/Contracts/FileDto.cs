namespace trkienBlog.Application.FileStorages.Contracts
{
        public sealed record FileUploadDto(
                Stream Stream,
                string FileName,
                string ContentType
        );
}
