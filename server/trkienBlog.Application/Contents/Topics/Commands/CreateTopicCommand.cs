using AutoMapper;
using MediatR;
using trkienBlog.Application.Contents.Topics;
using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Application.FileStorage.Services;
using trkienBlog.Application.FileStorages.Contracts;
using trkienBlog.Application.FileStorages.Services;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Topics.Commands
{
        public sealed record CreateTopicCommand(TopicPayload Payload) : IRequest<TopicDto>;
        public sealed class CreateTopicCommandHandler : IRequestHandler<CreateTopicCommand, TopicDto>
        {
                private readonly ITopicRepository _topicRepo;
                private readonly IFileStorageService _storage;
                private readonly IFileUrlBuilder _urlBuilder;
                private readonly IMapper _mapper;
                public CreateTopicCommandHandler (
                        ITopicRepository topicRepo,
                        IFileStorageService storage,
                        IFileUrlBuilder urlBuilder,
                        IMapper mapper
                ) {
                        _topicRepo = topicRepo;
                        _storage = storage;
                        _urlBuilder = urlBuilder;
                        _mapper= mapper;        
                }

                public async Task<TopicDto> Handle(CreateTopicCommand command, CancellationToken cancellation)
                {
                        var payload = command.Payload;

                        FileUploadDto? fileUpload = null;
                        string? imageKey = null;

                        if (payload.Image is not null)
                        {
                                fileUpload = new FileUploadDto(
                                        payload.Image.OpenReadStream(),
                                        payload.Image.FileName,
                                        payload.Image.ContentType
                                );

                                using (fileUpload.Stream)
                                {
                                        imageKey = await _storage.UploadAsync(fileUpload.Stream, fileUpload.FileName, fileUpload.ContentType);
                                }
                        }

                        var entity = new Topic(payload.Name.Trim(), imageKey);
                        await _topicRepo.AddAsync(entity, cancellation);

                        return _mapper.Map<TopicDto>(entity);
                }
        }
}
