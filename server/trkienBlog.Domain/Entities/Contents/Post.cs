using trkienBlog.Domain.Common;
using trkienBlog.Domain.Entities.Contents;
using trkienBlog.Domain.Enums;

namespace trkienBlog.Domain.Entities.Content
{
        public sealed class Post : AggregateRoot<Guid>
        {
                #region Constructor
                private Post() { }
                public Post(
                        string title,
                        string slug,
                        string contentJson,
                        Guid topicId,
                        IEnumerable<Guid> tagIds,
                        string? thumbnailKey
                ) {
                        Id = Guid.NewGuid();
                        Title = title;
                        Slug = slug;
                        ContentJson = contentJson;
                        TopicId = topicId;
                        ThumbnailKey = thumbnailKey;
                        Status = PostStatus.Draft;
                        CreatedAt = DateTime.UtcNow;

                        SetTags(tagIds);
                }
                #endregion

                #region Properties
                public string Title { get; private set; } = default!;
                public string Slug { get; private set; } = default!;
                public string ContentJson { get; private set; } = default!;
                public Guid TopicId { get; private set; }
                public string? ThumbnailKey { get; private set; }
                public PostStatus Status { get; private set; }
                public DateTime CreatedAt { get; private set; }
                public DateTime? PublishedAt { get; private set; }

                private readonly List<PostTag> _tags = new();
                public IReadOnlyCollection<PostTag> Tags => _tags;

                #endregion

                #region Domain Behaviors
                public void UpdateContent(string title, string slug, string contentJson, Guid topicId, IEnumerable<Guid> tagIds, string? thumbnailKey)
                {
                        Title = title;
                        Slug = slug;
                        ContentJson = contentJson;
                        TopicId = topicId;      
                        ThumbnailKey = thumbnailKey;
                        SetTags(tagIds);
                }

                public void SetTags(IEnumerable<Guid> tagIds)
                {
                        _tags.Clear();

                        foreach (var tagId in tagIds.Distinct())
                        {
                                _tags.Add(new PostTag(Id, tagId));
                        }
                }

                public void Publish()
                {
                        Status = PostStatus.Published;
                        PublishedAt = DateTime.UtcNow;
                }
                #endregion
        }
}
