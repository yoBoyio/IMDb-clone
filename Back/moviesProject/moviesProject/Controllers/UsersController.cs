using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json;
using moviesProject.Classes;
using Microsoft.AspNetCore.Authorization;

namespace moviesProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IJWTAuthenticationManager jwtAuthenticationManager;
        public UsersController(IJWTAuthenticationManager jwtAuthenticationManager)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }

        
        [HttpGet]
        public IActionResult Get() 
        {
            DbMethods.InitializeDB();
            List<user> uList = new List<user>();
            uList = user.GetUsers();
            string json = JsonConvert.SerializeObject(uList, Formatting.Indented);
            return Ok(json);

        }

        // (url)/api/Users/info + HEADER Authorization {GET} Json Body: {"Email":" "}

        [HttpGet("info")]
        public IActionResult GetUser([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            user user = user.getUser(userCred.Email);
            string json = JsonConvert.SerializeObject(user, Formatting.Indented);
            return Ok(json);
        }

        // (url)/api/Users/signup {POST} Json Body: {"Email":" ", "Name":" ", "Password":" "}
        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult PostUser([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            user.insertUser(userCred.Name, userCred.Email, userCred.Password);
            return Ok("200: description: Successfully inserted user");
        }

        // (url)/api/Users/authenticate {POST} Json Body: {"Email":" " , "Password":" "}
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            var token = jwtAuthenticationManager.Authenticate(userCred.Email, userCred.Password);
            if (token == null)
                return Unauthorized();

            return Ok(token);
        }

    }
}
