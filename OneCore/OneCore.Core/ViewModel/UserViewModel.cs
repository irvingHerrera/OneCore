using OneCore.Core.Enum;
using System;

namespace OneCore.Core.ViewModel
{
    public class UserViewModel
    {
        public int Id { get; set; }

        public string User { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public DateTime CreationDate { get; set; }

        public Status Status { get; set; }

        public Gender Gender { get; set; }
    }
}
