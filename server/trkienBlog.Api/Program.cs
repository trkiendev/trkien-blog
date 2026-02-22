using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using trkienBlog.Application;
using trkienBlog.Application.Security;
using trkienBlog.Infrastructure;
using trkienBlog.Infrastructure.FileStorages;
using trkienBlog.Infrastructure.Persistence;
using Amazon;

// Builder
var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure();
builder.Services.AddApplication();

// AutoMapper
builder.Services.AddAutoMapper(
        cfg => { },
        typeof(ApplicationMappingMarker).Assembly
);

// Database Connection
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

// AmazonS3Client
builder.Services.Configure<R2Options>(builder.Configuration.GetSection("R2"));
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
        var options = sp.GetRequiredService<IOptions<R2Options>>().Value;

        var config = new AmazonS3Config
        {
                ServiceURL = options.ServiceUrl,
                ForcePathStyle = true,
                AuthenticationRegion = "us-east-1",
        };

        return new AmazonS3Client(
                builder.Configuration["R2:AccessKey"],
                builder.Configuration["R2:SecretKey"],
                config
        );
});

// ===  Build app ===
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