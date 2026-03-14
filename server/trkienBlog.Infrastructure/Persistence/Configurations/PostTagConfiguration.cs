using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trkienBlog.Domain.Entities.Contents;

namespace trkienBlog.Infrastructure.Persistence.Configurations
{
        public sealed class PostTagConfiguration : IEntityTypeConfiguration<PostTag>
        {
                public void Configure(EntityTypeBuilder<PostTag> builder)
                {
                        builder.ToTable("PostTags", "Content");

                        builder.HasKey(x => new { x.PostId, x.TagId });

                        builder.Property(x => x.PostId).IsRequired();
                        builder.Property(x => x.TagId).IsRequired();
                }
        }
}
