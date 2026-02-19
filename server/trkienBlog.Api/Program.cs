using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using trkienBlog.Application.Security;
using trkienBlog.Infrastructure;
using trkienBlog.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure();

// Database Connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS
builder.Services.AddCors(options =>
{
        options.AddPolicy("AllowNext",
                policy =>
                {
                        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                });
});

// JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer("Bearer", options =>
        {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                };

                // JWT lấy từ HttpOnly cookie
                options.Events = new JwtBearerEvents
                {
                        OnMessageReceived = context =>
                        {
                                var token = context.Request.Cookies["access_token"];
                                if (!string.IsNullOrEmpty(token))
                                        context.Token = token;

                                return Task.CompletedTask;
                        }
                };
        });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseDeveloperExceptionPage();
} else
{
        app.UseExceptionHandler(options =>
        {
                options.Run(async context =>
                {
                        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;

                        context.Response.StatusCode = 500;

                        await context.Response.WriteAsJsonAsync(new
                        {
                                success = false,
                                message = "Internal Server Error"
                        });
                });
        });
}

// Seed Db
using(var scope = app.Services.CreateScope())
{
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHaser>();

        await DbSeeder.SeedAsync(db, hasher);
}

app.UseCors("AllowNext");
// app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();