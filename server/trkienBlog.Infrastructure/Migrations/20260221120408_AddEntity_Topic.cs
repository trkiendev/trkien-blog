using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trkienBlog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEntity_Topic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Topic");

            migrationBuilder.CreateTable(
                name: "Content",
                schema: "Topic",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    ImageKey = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Content", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Content_ImageKey",
                schema: "Topic",
                table: "Content",
                column: "ImageKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Content_Name",
                schema: "Topic",
                table: "Content",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Content",
                schema: "Topic");
        }
    }
}
