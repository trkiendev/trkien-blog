using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence.Configurations
{
        public sealed class UserConfiguration : IEntityTypeConfiguration<User>
        {
                public void Configure(EntityTypeBuilder<User> builder)
                {
                        builder.ToTable("Users", "Account");

                        builder.HasKey(x => x.Id);

                        // === Properties ===
                        builder.Property(x => x.Username)
                                .IsRequired()
                                .HasMaxLength(100);

                        builder.Property(x => x.PasswordHash)
                                .IsRequired()
                                .HasMaxLength(100);

                        builder.Property(x => x.CreatedAt)
                                .IsRequired()
                                .HasColumnType("timestamp with time zone")
                                .HasDefaultValueSql("NOW()");

                        // === Indexes ===
                        builder.HasIndex(x => x.Username).IsUnique();
                }
        }
}
