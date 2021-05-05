using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using moviesProject.Controllers;
using System.Security.Claims;

namespace moviesProject.Classes
{
    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {
        private string key { get;}
        public JWTAuthenticationManager(string key) 
        {
            this.key = key;
        }
        public string Authenticate(string uname, string upass)
        {
            if (!UserMethods.authUser(uname,upass))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, uname)
                }),
                Expires = DateTime.UtcNow.AddDays(4),
                SigningCredentials =
                new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

