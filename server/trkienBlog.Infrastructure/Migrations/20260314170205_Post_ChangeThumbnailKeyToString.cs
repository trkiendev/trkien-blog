using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trkienBlog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Post_ChangeThumbnailKeyToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ThumbnailKey",
                schema: "Content",
                table: "Posts",
                type: "text",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "ThumbnailKey",
                schema: "Content",
                table: "Posts",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }
    }
}
