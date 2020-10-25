using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Horse_Stables.Models
{
    public class Horse
    {
        //The Primary Key
        [Key]
        public int HorseID { get; set; }

        //Name cannot be more then 16 characters
        [Required, Display(Name = "Horse's Name")]
        [StringLength(16, MinimumLength = 2, ErrorMessage = "Horse's name must be between 2-16 characters")]
        public string Name { get; set; }

        //Horse's current top speed
        [Required, Display(Name = "Top Speed")]
        public int TopSpeed { get; set; }

        //Breed cannot be more then 20 characters
        [Required]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "Breed must be between 2-20 characters")]
        public string Breed { get; set; }

        //DOB of Horse
        [Required, Display(Name = "Date of Birth")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        //Gender of Race Horse
        [Required]
        public Gender Gender { get; set; }

        //Notes concerning Horse's Racing Condition
        [StringLength(50, ErrorMessage = "Notes cannot exceed 50 characters")]
        public string Notes { get; set; }
    }

    public enum Gender
    {
        Male, Female
    }
}
