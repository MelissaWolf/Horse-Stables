using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Horse_Stables.Models;

namespace Horse_Stables.Data
{
    public class Horse_StablesContext : DbContext
    {
        public Horse_StablesContext (DbContextOptions<Horse_StablesContext> options)
            : base(options)
        {
        }

        public DbSet<Horse_Stables.Models.Horse> Horse { get; set; }
    }
}
