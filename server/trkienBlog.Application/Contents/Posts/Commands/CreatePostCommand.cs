using MediatR;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Tags;
using trkienBlog.Application.Contents.Topics;
using trkienBlog.Application.Exceptions;
using trkienBlog.Application.FileStorage.Services;
using trkienBlog.Application.FileStorages.Contracts;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Application.Contents.Posts.Commands
{
        public sealed record CreatePostCommand(PostPayload Payload) : IRequest<Unit>;
        public sealed class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, Unit>
        {
                private readonly IPostRepository _postRepo;
                private readonly ITagRepository _tagRepo;
                private readonly ITopicRepository _topicRepo;
                private readonly IFileStorageService _storage;
                public CreatePostCommandHandler(
                        IPostRepository postRepo, 
                        ITagRepository tagRepo, 
                        ITopicRepository topicRepo,
                        IFileStorageService storage
                ) {
                        _postRepo = postRepo;
                        _tagRepo = tagRepo;
                        _topicRepo = topicRepo;
                        _storage = storage;
                }       

                public async Task<Unit> Handle(CreatePostCommand command, CancellationToken cancellation)
                {
                        var payload = command.Payload;

                        #region Validation
                        var topicExist = await _topicRepo.ExistByIdAsync(payload.TopicId, cancellation);
                        if (!topicExist) throw new NotFoundException("Topic not found");

                        var tagExist = await _tagRepo.ExistByIdsAsync(payload.TagIds, cancellation);
                        if (!tagExist) throw new NotFoundException("Tag not found");
                        #endregion

                        #region Thumbnail
                        FileUploadDto? thumbnailUpload = null;
                        string? thumbnailKey = null;
                        
                        if(payload.Thumbnail is not null)
                        {
                                thumbnailUpload = new FileUploadDto(
                                        payload.Thumbnail.OpenReadStream(),
                                        payload.Thumbnail.FileName,
                                        payload.Thumbnail.ContentType
                                );

                                using(thumbnailUpload.Stream)
                                {
                                        thumbnailKey = await _storage.UploadAsync(thumbnailUpload.Stream, thumbnailUpload.FileName, thumbnailUpload.ContentType);
                                }
                        }
                        #endregion

                        var entity = new Post(
                                title: payload.Title,
                                slug: payload.Slug,
                                contentJson: payload.ContentJson,
                                topicId: payload.TopicId,
                                tagIds: payload.TagIds,
                                thumbnailKey: thumbnailKey
                        );

                        await _postRepo.AddAsync(entity, cancellation);

                        return Unit.Value;
                }
        }
}
