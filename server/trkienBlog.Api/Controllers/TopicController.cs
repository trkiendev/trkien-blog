using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using trkienBlog.Api.Contracts;
using trkienBlog.Application.Contents.Topics.Services.Interfaces;
using trkienBlog.Application.FileStorages.Contracts;

namespace trkienBlog.Api.Controllers
{
        [Authorize]
        [ApiController]
        [Route("api/topic")]
        public class TopicController : ControllerBase
        {
                private readonly ITopicService _topic;
                public TopicController(ITopicService topic)
                {
                        _topic = topic;
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
                #endregion

                #region POST
                [HttpPost]
                public async Task<IActionResult> CreateAsync([FromForm] TopicPayload payload, CancellationToken cancellation)
                {
                        FileUploadDto? fileUpload = null;

                        if(payload.Image is not null)
                        {
                                fileUpload = new FileUploadDto (
                                        payload.Image.OpenReadStream(),
                                        payload.Image.FileName,
                                        payload.Image.ContentType
                                );
                        }

                        var dto = await _topic.CreateAsync(payload.Name, fileUpload, cancellation);

                        return CreatedAtAction (
                                nameof(GetById),
                                new { id = dto.Id },
                                dto
                        );
                }
                #endregion
        }
}
