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
using System.IdentityModel.Tokens.Jwt;

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

        // (url)/api/Users/info + HEADER Authorization {GET} | returns User
       
        [HttpGet("info")]
        public IActionResult GetUser([FromHeader] string Authorization)
        {
            DbMethods.InitializeDB();

            string email = tokenObj.GetNameClaims(Authorization);

            user user = user.getUser(email);

            if (user==null)
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
        // (url)/api/Users/login {POST} Json Body: {"Email":" " , "Password":" "} | returns Token
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
            tokenObj sendToken = new tokenObj(token);
            List<object> objects = new List<object>();
            objects.Add(sendToken);
            objects.Add(user);
            return Ok(JsonConvert.SerializeObject(objects, Formatting.Indented));
        }

        [HttpGet("watchlist/Get")]
        public IActionResult GetWatchlist([FromHeader] string Authorization)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            DbMethods.InitializeDB();
            if (email == "")
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));

            if (user.getUser(email) == null)
                return NotFound(JsonConvert.SerializeObject("User not found", Formatting.Indented));

            

            WatchList wl = WatchList.GetMovies(email);
            string json = JsonConvert.SerializeObject(wl, Formatting.Indented);

            return Ok(json);
        }

        [HttpPost("watchlist/Add")]
        public IActionResult AddToWL([FromHeader] string Authorization,[FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            string movie = userCred.MovieId;

            if (email == "" || movie == "")
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));

            DbMethods.InitializeDB();

            if (user.getUser(email) == null)
                return NotFound(JsonConvert.SerializeObject("User not found", Formatting.Indented));

            

            if (!WatchList.insertInWL(email, movie))
                return NotFound(JsonConvert.SerializeObject("Invalid user and movie", Formatting.Indented));

            return Ok("200: description: Successfully inserted Movie to user Watchlist");
        }

        [HttpPost("watchlist/Remove")]
        public IActionResult RemoveFromWL([FromHeader] string Authorization, [FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            string movie = userCred.MovieId;

            DbMethods.InitializeDB();
            if (!WatchList.removeFromWL(email,movie))
                return NotFound(JsonConvert.SerializeObject("Invalid User and movie", Formatting.Indented));

            return Ok("200: description: Successfully removed movie from user Watchlist");
        }

    }
}
