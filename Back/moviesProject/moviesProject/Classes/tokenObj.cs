using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace moviesProject.Classes
{
    public class tokenObj
    {
        public string token { set; get; }
        public tokenObj(string token) 
        {
            this.token = token;
        }

        public static string GetNameClaims(string token)
        {
            //Gets token replaces bearer and decrypts it
            var jwt = token.Replace("bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var DecryptedToken = handler.ReadJwtToken(jwt);

            //returns token user email 
            return DecryptedToken.Claims.ToArray()[0].Value;
        }
    }
}
