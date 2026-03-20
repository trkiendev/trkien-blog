using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Contents.Posts.Commands;
using trkienBlog.Application.Contents.Posts.Contracts;
using trkienBlog.Application.Contents.Posts.Queries;

namespace trkienBlog.Api.Controllers.Admin.Contents
{
        [Authorize]
        [ApiController]
        [Route("api/admin/posts")]
        public class AdminPostController : ControllerBase
        {
                private readonly IMediator _mediator;
                public AdminPostController(IMediator mediator)
                {
                        _mediator = mediator;   
                }

                #region GET
                [HttpGet("table")]
                public async Task<IActionResult> GetTable(CancellationToken cancellation)
                {
                        var table = await _mediator.Send(new GetTablePostsQuery(), cancellation);
                        return Ok(table);
                }

                [HttpGet("{id:guid}/detail")]
                public async Task<IActionResult> GetDetail([FromRoute] Guid id, CancellationToken cancellation)
                {
                        var detail = await _mediator.Send(new GetAdminPostDetailQuery(id), cancellation);
                        return Ok(detail);
                }
                #endregion

                [HttpPost]
                public async Task<IActionResult> Create([FromForm] PostPayload payload, CancellationToken cancellation)
                {
                        var result = await _mediator.Send(new CreatePostCommand(payload), cancellation);
                        return Ok(result);
                }

                [HttpPut("{id:guid}")]
                public async Task<IActionResult> Update([FromRoute] Guid id, [FromForm] PostPayload payload, CancellationToken cancellation)
                {
                        var result = await _mediator.Send(new UpdatePostCommand(id, payload), cancellation);
                        return Ok(result);      
                }
        }
}
