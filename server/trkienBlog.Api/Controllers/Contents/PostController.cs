using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Contents.Posts.Commands;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Posts.Queries;

namespace trkienBlog.Api.Controllers.Contents
{
        [Authorize]
        [ApiController]
        [Route("api/posts")]
        public class PostController : ControllerBase
        {
                private readonly IMediator _mediator;
                public PostController(IMediator mediator)
                {
                        _mediator = mediator;
                }

                [HttpGet("table")]
                public async Task<IActionResult> GetTable(CancellationToken cancellation)
                {
                        var table = await _mediator.Send(new GetTablePostsQuery(), cancellation);
                         return Ok(table);
                }

                [HttpPost]
                public async Task<IActionResult> Create([FromForm] PostPayload payload, CancellationToken cancellation)
                {
                        var result = await _mediator.Send(new CreatePostCommand(payload), cancellation);
                        return Ok(result);
                }
        }
}
