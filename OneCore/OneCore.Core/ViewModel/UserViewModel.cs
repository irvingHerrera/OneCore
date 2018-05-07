using OneCore.Core.Enum;
using System;
using System.ComponentModel.DataAnnotations;

namespace OneCore.Core.ViewModel
{
    public class UserViewModel
    {
        public int Id { get; set; }

        [Required]
        public string User { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime CreationDate { get; set; }

        public Status Status { get; set; }

        public Gender Gender { get; set; }
    }
}
