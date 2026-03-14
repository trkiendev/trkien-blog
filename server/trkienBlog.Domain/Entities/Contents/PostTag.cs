namespace trkienBlog.Domain.Entities.Contents
{
        public sealed class PostTag
        {
                public Guid PostId { get; private set; }
                public Guid TagId { get; private set; }

                private PostTag() { }

                public PostTag(Guid postId, Guid tagId)
                {
                        PostId = postId;
                        TagId = tagId;
                }
        }
}
