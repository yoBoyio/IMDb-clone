using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft;
using Newtonsoft.Json;

namespace moviesProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() 
        {
            DbMethods.InitializeDB();
            List<user> uList = new List<user>();
            uList = user.GetUsers();
            string json = JsonConvert.SerializeObject(uList, Formatting.Indented);
            return Ok(json);

        }

        // (url)/api/Users/info {GET} 
        [HttpGet("info")]
        public IActionResult GetUser([FromHeader] string Email)
        {
            DbMethods.InitializeDB();
            user user = user.getUser(Email);
            string json = JsonConvert.SerializeObject(user, Formatting.Indented);
            return Ok(json);
        }

        // (url)/api/Users/login {GET}
        [HttpGet("login")]
        public IActionResult authUser([FromHeader] string Email,[FromHeader] string Pass)
        {
            DbMethods.InitializeDB();
            string json = JsonConvert.SerializeObject(user.authUser(Email,Pass), Formatting.Indented);
            return Ok(json);
        }

        // (url)/api/Users/signup  {PUT}
        [HttpPut("signup")]
        public IActionResult PostUser([FromHeader] string Email, [FromHeader] string Pass, [FromHeader] string Name)
        {
            DbMethods.InitializeDB();
            user.insertUser(Name, Email, Pass);
            return Ok("200: description: Successfully inserted user");
        }

    }
}
