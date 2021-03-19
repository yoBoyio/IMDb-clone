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

        // (url)/api/Users/info + HEADER Authorization {GET} Json Body: {"Email":" "} | returns User
       
        [HttpGet("info")]
        public IActionResult GetUser([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            user user = user.getUser(userCred.Email);
            if(user==null)
                return NotFound(JsonConvert.SerializeObject("User does not exist", Formatting.Indented));

            string json = JsonConvert.SerializeObject(user, Formatting.Indented);
            return Ok(json);
        }


        // (url)/api/Users/signup {POST} Json Body: {"Email":" ", "Name":" ", "Password":" "} | Inserts User
        [AllowAnonymous]
        [HttpPost("signup")]
        public IActionResult PostUser([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            var name= userCred.Name;
            var email = userCred.Email ;
            var password = userCred.Password;
          
            // validate fields
            if ( name =="" || email=="" || password == "")
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            

            // check  if user exists
            if (user.getUser(email)!=null)
                return NotFound(JsonConvert.SerializeObject("User already exists", Formatting.Indented));

            //check if user saved
            bool savedUser= user.insertUser(name, email, password);
            if(!savedUser)
                return NotFound(JsonConvert.SerializeObject("Something went wrong saving the user", Formatting.Indented));

            return Ok("200: description: Successfully inserted user");
        }
        // (url)/api/Users/authenticate {POST} Json Body: {"Email":" " , "Password":" "} | returns Token
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            var email = userCred.Email;
            var password = userCred.Password;


            //validate fields
            if (email == "" || password == "")
            {
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            }
            //validate user
            var token = jwtAuthenticationManager.Authenticate(email, password);
            if (token == null)
                return Unauthorized(JsonConvert.SerializeObject("Invalid credentials", Formatting.Indented));

            user user = user.getUser(email);
            return Ok(JsonConvert.SerializeObject(token + " user: {" +
                "id:"+user.uID+
                "email:"+email+
                "name:"+user.uName
                , Formatting.Indented));
        }

        // (url)/api/Users/authenticate {POST} Json Body: {"Email":" " , "Password":" "} | returns Token
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            var token = jwtAuthenticationManager.Authenticate(userCred.Email, userCred.Password);
            if (token == null)
                return Unauthorized();

            return Ok(JsonConvert.SerializeObject(token, Formatting.Indented));
        }

        [HttpGet("watchlist/GetWatchList")]
        public IActionResult GetWatchlist([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            WatchList wl = WatchList.GetMovies(userCred.Email);
            string json = JsonConvert.SerializeObject(wl, Formatting.Indented);
            return Ok(json);
        }

        [HttpPost("watchlist/AddToWatchList")]
        public IActionResult AddToWL([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            WatchList.insertInWL(userCred.Email, userCred.MovieId);
            return Ok("200: description: Successfully inserted Movie to user Watchlist");
        }

    }
}
