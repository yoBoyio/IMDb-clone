using System;
using System.Collections.Generic;

#nullable disable

namespace moviesProject.Database
{
    public partial class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public bool? IsAdmin { get; set; }
    }
}
