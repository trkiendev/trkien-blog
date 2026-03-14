using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trkienBlog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Rename_ContentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Topic",
                schema: "Content",
                table: "Topic");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tag",
                schema: "Content",
                table: "Tag");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Posts",
                newSchema: "Content");

            migrationBuilder.RenameTable(
                name: "Topic",
                schema: "Content",
                newName: "Topics",
                newSchema: "Content");

            migrationBuilder.RenameTable(
                name: "Tag",
                schema: "Content",
                newName: "Tags",
                newSchema: "Content");

            migrationBuilder.RenameIndex(
                name: "IX_Topic_Name",
                schema: "Content",
                table: "Topics",
                newName: "IX_Topics_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Topic_ImageKey",
                schema: "Content",
                table: "Topics",
                newName: "IX_Topics_ImageKey");

            migrationBuilder.RenameIndex(
                name: "IX_Tag_Slug",
                schema: "Content",
                table: "Tags",
                newName: "IX_Tags_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Tag_Name",
                schema: "Content",
                table: "Tags",
                newName: "IX_Tags_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Tag_DisplayOrder",
                schema: "Content",
                table: "Tags",
                newName: "IX_Tags_DisplayOrder");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topics",
                schema: "Content",
                table: "Topics",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                schema: "Content",
                table: "Tags",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Topics",
                schema: "Content",
                table: "Topics");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                schema: "Content",
                table: "Tags");

            migrationBuilder.RenameTable(
                name: "Posts",
                schema: "Content",
                newName: "Posts");

            migrationBuilder.RenameTable(
                name: "Topics",
                schema: "Content",
                newName: "Topic",
                newSchema: "Content");

            migrationBuilder.RenameTable(
                name: "Tags",
                schema: "Content",
                newName: "Tag",
                newSchema: "Content");

            migrationBuilder.RenameIndex(
                name: "IX_Topics_Name",
                schema: "Content",
                table: "Topic",
                newName: "IX_Topic_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Topics_ImageKey",
                schema: "Content",
                table: "Topic",
                newName: "IX_Topic_ImageKey");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_Slug",
                schema: "Content",
                table: "Tag",
                newName: "IX_Tag_Slug");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_Name",
                schema: "Content",
                table: "Tag",
                newName: "IX_Tag_Name");

            migrationBuilder.RenameIndex(
                name: "IX_Tags_DisplayOrder",
                schema: "Content",
                table: "Tag",
                newName: "IX_Tag_DisplayOrder");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Topic",
                schema: "Content",
                table: "Topic",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tag",
                schema: "Content",
                table: "Tag",
                column: "Id");
        }
    }
}
