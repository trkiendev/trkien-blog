using Amazon.Runtime.Internal.Util;
using System.Net;
using System.Text.Json;
using trkienBlog.Application.Exceptions;
using trkienBlog.Domain.Exceptions;

namespace trkienBlog.Api.Middlewares
{
        public sealed class GlobalExceptionMiddleware
        {
                private readonly RequestDelegate _next;
                private readonly ILogger<GlobalExceptionMiddleware> _logger;
                public GlobalExceptionMiddleware(
                        RequestDelegate next,
                        ILogger<GlobalExceptionMiddleware> logger
                )
                {
                        _next = next;
                        _logger = logger;
                }

                public async Task InvokeAsync(HttpContext context)
                {
                        try
                        {
                                await _next(context);
                        }
                        catch (DomainException ex)
                        {
                                _logger.LogWarning(ex, "Domain exception occurred");
                                await WriteResponseAsync(context, HttpStatusCode.BadRequest, ex.Message);
                        }
                        catch (NotFoundException ex)
                        {
                                _logger.LogInformation(ex, "Resource not found");
                                await WriteResponseAsync(context, HttpStatusCode.NotFound, ex.Message);
                        }
                        catch (UnauthorizedAccessException ex)
                        {
                                _logger.LogWarning(ex, "Unauthorized access");
                                await WriteResponseAsync(context, HttpStatusCode.Unauthorized, "Unauthorized");
                        } catch(Exception ex)
                        {
                                _logger.LogError(ex, "Unhandled exception occurred");
                                await WriteResponseAsync(context, HttpStatusCode.InternalServerError, "Internal Server Error");
                        }
                }

                private static async Task WriteResponseAsync(HttpContext context, HttpStatusCode statusCode, string message)
                {
                        if (context.Response.HasStarted)
                                return;

                        context.Response.Clear();
                        context.Response.ContentType = "application/json";
                        context.Response.StatusCode = (int)statusCode;

                        var response = new {
                                success = false,
                                message
                        };

                        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                }
        }
}
