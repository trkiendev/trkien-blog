using Microsoft.EntityFrameworkCore;
using trkienBlog.Domain.Entities;
using trkienBlog.Domain.Entities.Content;
using trkienBlog.Domain.Entities.Contents;

namespace trkienBlog.Infrastructure.Persistence
{
        public sealed class AppDbContext : DbContext
        {
                public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

                public DbSet<User> Users => Set<User>();
                public DbSet<Topic> Topics => Set<Topic>();     
                public DbSet<Tag> Tags => Set<Tag>();
                public DbSet<Post> Posts => Set<Post>();        
                public DbSet<PostTag> PostTags => Set<PostTag>();

                protected override void OnModelCreating(ModelBuilder modelBuilder)
                {
                        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
                }
        }
}
