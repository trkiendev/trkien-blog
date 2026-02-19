using Microsoft.EntityFrameworkCore;
using trkienBlog.Application.Security;
using trkienBlog.Domain.Entities;

namespace trkienBlog.Infrastructure.Persistence
{
        public static class DbSeeder
        {
                public static async Task SeedAsync(AppDbContext dbContext, IPasswordHaser passwordHasher)
                {
                        if(await dbContext.Users.AnyAsync())
                                return;

                        var admin = new User(
                                username: "admin",
                                passwordHash: passwordHasher.Hash("trkienBlog@dmin3642")
                        );

                        dbContext.Users.Add(admin);
                        await dbContext.SaveChangesAsync();
                }
        }
}
