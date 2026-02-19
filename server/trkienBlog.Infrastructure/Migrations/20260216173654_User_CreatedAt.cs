using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trkienBlog.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class User_CreatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "Account",
                table: "Users");
        }
    }
}
