using Microsoft.EntityFrameworkCore;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence
{
        public sealed class AppDbContext : DbContext
        {
                public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

                public DbSet<User> Users => Set<User>();
                public DbSet<Topic> Topics => Set<Topic>();     

                protected override void OnModelCreating(ModelBuilder modelBuilder)
                {
                        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
                }
        }
}
