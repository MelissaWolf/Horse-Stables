using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Horse_Stables.Migrations
{
    public partial class HSDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Horse",
                columns: table => new
                {
                    HorseID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 16, nullable: false),
                    TopSpeed = table.Column<int>(nullable: false),
                    Breed = table.Column<string>(maxLength: 20, nullable: false),
                    DOB = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<int>(nullable: false),
                    Notes = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Horse", x => x.HorseID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Horse");
        }
    }
}
