using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moviesProject.Classes
{
    public interface IJWTAuthenticationManager
    {
        String Authenticate(string uname, string upass);
    }
}
