using System.ComponentModel.DataAnnotations;

namespace trkienBlog.Api.Contracts
{
        public sealed record TopicPayload
        {
                [Required]
                [MaxLength(250)]
                public string Name { get; set; } = default!;

                public IFormFile? Image { get; set; }
        }
}
