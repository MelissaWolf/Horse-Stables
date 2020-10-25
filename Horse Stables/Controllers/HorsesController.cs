using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Horse_Stables.Data;
using Horse_Stables.Models;

namespace Horse_Stables.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorsesController : ControllerBase
    {
        private readonly Horse_StablesContext _context;

        public HorsesController(Horse_StablesContext context)
        {
            _context = context;
        }

        // GET: api/Horses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Horse>>> GetHorse()
        {
            return await _context.Horse.ToListAsync();
        }

        // GET: api/Horses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Horse>> GetHorse(int id)
        {
            var horse = await _context.Horse.FindAsync(id);

            if (horse == null)
            {
                return NotFound();
            }

            return horse;
        }

        // PUT: api/Horses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHorse(int id, Horse horse)
        {
            if (id != horse.HorseID)
            {
                return BadRequest();
            }

            _context.Entry(horse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HorseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Horses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Horse>> PostHorse(Horse horse)
        {
            _context.Horse.Add(horse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHorse", new { id = horse.HorseID }, horse);
        }

        // DELETE: api/Horses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Horse>> DeleteHorse(int id)
        {
            var horse = await _context.Horse.FindAsync(id);
            if (horse == null)
            {
                return NotFound();
            }

            _context.Horse.Remove(horse);
            await _context.SaveChangesAsync();

            return horse;
        }

        private bool HorseExists(int id)
        {
            return _context.Horse.Any(e => e.HorseID == id);
        }
    }
}
