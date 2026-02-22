using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence.Configurations
{
        public sealed class TopicConfiguration : IEntityTypeConfiguration<Topic>
        {
                public void Configure(EntityTypeBuilder<Topic> builder) {
                        builder.ToTable("Content", "Topic");

                        builder.HasKey(x => x.Id);

                        // Properies
                        builder.Property(x => x.Name).IsRequired().HasMaxLength(250);
                        builder.Property(x => x.ImageKey).IsRequired(false);
                        builder.Property(x => x.CreatedAt)
                                .IsRequired()
                                .HasColumnType("timestamp with time zone")
                                .HasDefaultValueSql("NOW()");

                        // Indexes
                        builder.HasIndex(x => x.Name).IsUnique();
                        builder.HasIndex(x => x.ImageKey).IsUnique();
                }

        }
}
