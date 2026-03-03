using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence.Configurations
{
        public sealed class TagConfiguration : IEntityTypeConfiguration<Tag>
        {
                public void Configure(EntityTypeBuilder<Tag> builder)
                {
                        builder.ToTable("Tag", "Content");

                        builder.HasKey(x => x.Id);

                        // Properties
                        builder.Property(x => x.Name).IsRequired().HasMaxLength(256);
                        builder.Property(x => x.Slug).IsRequired().HasMaxLength(100);
                        builder.Property(x => x.IsVisible).IsRequired().HasDefaultValue(true);
                        builder.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);
                        builder.Property(x => x.DisplayOrder).IsRequired().HasDefaultValue(0);
                        builder.Property(x => x.CreatedAt)
                                .IsRequired()
                                .HasColumnType("timestamp with time zone")
                                .HasDefaultValueSql("NOW()");

                        // Indexes
                        builder.HasIndex(x => x.Name).IsUnique();
                        builder.HasIndex(x => x.Slug).IsUnique();
                        builder.HasIndex(x => x.DisplayOrder);
                }
        }
}
