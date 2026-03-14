using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trkienBlog.Domain.Entities.Content;

namespace trkienBlog.Infrastructure.Persistence.Configurations
{
        public sealed class PostConfiguration : IEntityTypeConfiguration<Post>
        {
                public void Configure(EntityTypeBuilder<Post> builder)
                {
                        builder.ToTable("Posts", "Content");

                        builder.HasKey(x => x.Id);

                        builder.Property(x => x.Title)
                                .IsRequired().HasMaxLength(300);

                        builder.Property(x => x.Slug)
                                .IsRequired().HasMaxLength(300);

                        builder.Property(x => x.ContentJson)
                                .HasColumnType("jsonb")
                                .IsRequired();

                        builder.Property(x => x.TopicId).IsRequired();

                        builder.Property(x => x.ThumbnailKey);

                        builder.Property(x => x.Status).IsRequired()
                                .HasConversion<int>();

                        builder.Property(x => x.CreatedAt).IsRequired();

                        builder.Property(x => x.PublishedAt);

                        builder.HasIndex(x => x.Slug).IsUnique();

                        // Relationship
                        builder.HasMany(x => x.Tags)
                            .WithOne()
                            .HasForeignKey(x => x.PostId)
                            .OnDelete(DeleteBehavior.Cascade);

                        // DDD backing field
                        builder.Navigation(x => x.Tags)
                            .UsePropertyAccessMode(PropertyAccessMode.Field);
                }
        }
}
