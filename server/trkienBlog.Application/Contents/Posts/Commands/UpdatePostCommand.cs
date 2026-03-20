using MediatR;
using trkienBlog.Application.Abstractions;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Tags;
using trkienBlog.Application.Contents.Topics;
using trkienBlog.Application.Exceptions;
using trkienBlog.Application.FileStorage.Services;

namespace trkienBlog.Application.Contents.Posts.Commands
{
        public sealed record UpdatePostCommand(Guid Id, PostPayload Payload) : IRequest<Unit>;

        public sealed class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, Unit>
        {
                private readonly IPostRepository _postRepo;
                private readonly ITagRepository _tagRepo;
                private readonly ITopicRepository _topicRepo;
                private readonly IFileStorageService _fileStorage;
                private readonly IUnitOfWork _uow;
                public UpdatePostCommandHandler(
                        IPostRepository postRepo, 
                        ITagRepository tagRepo, 
                        ITopicRepository topicRepo,
                        IFileStorageService fileStorage,
                        IUnitOfWork uow
                ) {
                        _postRepo = postRepo;
                        _topicRepo = topicRepo; 
                        _tagRepo = tagRepo;     
                        _fileStorage = fileStorage;     
                        _uow = uow;     
                }

                public async Task<Unit> Handle(UpdatePostCommand command, CancellationToken cancellation)
                {
                        var payload = command.Payload;

                        #region Validations
                        var topicExist = await _topicRepo.ExistByIdAsync(payload.TopicId, cancellation);
                        if (!topicExist) throw new NotFoundException("Topic not found");

                        var tagExist = await _tagRepo.ExistByIdsAsync(payload.TagIds, cancellation);
                        if (!tagExist) throw new NotFoundException("Tag not found");

                        var post = await _postRepo.GetByIdAsync(command.Id, cancellation);
                        if (post is null) throw new NotFoundException("Post not found");
                        #endregion

                        #region Thumbnail
                        string? newThumbnailKey = post.ThumbnailKey;
                        // Remove thumbnail
                        if(post.ThumbnailKey is not null)
                        {
                                await _fileStorage.DeleteAsync(post.ThumbnailKey);
                                newThumbnailKey = null;
                        }

                        // replace thumbnail
                        if(payload.Thumbnail is not null)
                        {
                                using var stream = payload.Thumbnail.OpenReadStream();
                                var uploadKey = await _fileStorage.UploadAsync(stream, payload.Thumbnail.FileName, payload.Thumbnail.ContentType);
                                if(post.ThumbnailKey is not null)
                                {
                                        await _fileStorage.DeleteAsync(post.ThumbnailKey);
                                }

                                newThumbnailKey = uploadKey;
                        }
                        #endregion

                        post.UpdateContent(
                                title: payload.Title,
                                slug: payload.Slug,
                                contentJson: payload.ContentJson,
                                topicId: payload.TopicId,
                                tagIds: payload.TagIds,
                                thumbnailKey: newThumbnailKey
                        );

                        await _postRepo.Update(post);
                        await _uow.SaveChangesAsync(cancellation);

                        return Unit.Value;
                }
        }
}
