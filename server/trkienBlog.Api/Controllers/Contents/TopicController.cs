using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Application.Contents.Topics.Commands;
using trkienBlog.Application.Contents.Topics.Contracts;
using trkienBlog.Application.Contents.Topics.Services.Interfaces;

namespace trkienBlog.Api.Controllers.Contents
{
        [ApiController]
        [Route("api/topics")]
        public class TopicController : ControllerBase
        {
                private readonly ITopicService _topic;
                private readonly IMediator _mediator;
                public TopicController(ITopicService topic, IMediator mediator)
                {
                        _topic = topic;
                        _mediator = mediator;   
                }

                #region GET
                [HttpGet("{id:guid}")]
                public async Task<IActionResult> GetById([FromRoute] Guid id, CancellationToken cancellation)
                {
                        var dto = await _topic.GetByIdAsync(id, cancellation);
                        return Ok(dto);
                }

                [HttpGet]
                public async Task<IActionResult> GetAll(CancellationToken cancellation)
                {
                        var list = await _topic.ListAllAsync(cancellation);
                        return Ok(list);
                }

                [HttpGet("lookup")]
                public async Task<IActionResult> ListLookup(CancellationToken cancellation)
                {
                        var lookups = await _topic.ListLookupAsync(cancellation);
                        return Ok(lookups);
                }
                #endregion

                #region POST
                [Authorize]
                [HttpPost]
                public async Task<IActionResult> CreateAsync([FromForm] TopicPayload payload, CancellationToken cancellation)
                {
                        var dto = await _mediator.Send(new CreateTopicCommand(payload), cancellation);
                        return Ok(dto); 
                }
                #endregion
        }
}
