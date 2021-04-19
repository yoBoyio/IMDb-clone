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


        // (url)/api/Users/info + HEADER Authorization {GET} | returns User
       
        [HttpGet("info")]
        public async Task<IActionResult> GetUserAsync([FromHeader] string Authorization)
        {
            DbMethods.InitializeDB();

            string email = tokenObj.GetNameClaims(Authorization);

            user user = await user.getUser(email);

            if (user==null)
                return NotFound(JsonConvert.SerializeObject("User does not exist", Formatting.Indented));

            string json = JsonConvert.SerializeObject(user, Formatting.Indented);
            return Ok(json);
        }


        // (url)/api/Users/signup {POST} Json Body: {"Email":" ", "Name":" ", "Password":" "} | Inserts User-----------------------
        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> PostUserAsync([FromBody] UserCred userCred)
        {
            DbMethods.InitializeDB();
            var name= userCred.Name;
            var email = userCred.Email ;
            var password = userCred.Password;
          
            // validate fields
            if ( name =="" || email=="" || password == "")
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            

            // check  if user exists
            if (await user.getUser(email)!=null)
                return NotFound(JsonConvert.SerializeObject("User already exists", Formatting.Indented));

            //check if user saved
            bool savedUser= await user.insertUserAsync(name, email, password);
            if(!savedUser)
                return NotFound(JsonConvert.SerializeObject("Something went wrong saving the user", Formatting.Indented));

            return Ok("200: description: Successfully inserted user");
        }


        // (url)/api/Users/login {POST} Json Body: {"Email":" " , "Password":" "} | returns Token----------------------------------
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserCred userCred)
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

            user user = await user.getUser(email);
            tokenObj sendToken = new tokenObj(token);
            List<object> objects = new List<object>();
            objects.Add(sendToken);
            objects.Add(user);
            return Ok(JsonConvert.SerializeObject(objects, Formatting.Indented));
        }


        //-----------------------------------------------WATCHLIST------------------------------------------------------------------

        [HttpGet("watchlist/Get")]
        public async Task<IActionResult> GetWatchlistAsync([FromHeader] string Authorization)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            DbMethods.InitializeDB();
            if (email == "")
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));

            if (await user.getUser(email) == null)
                return NotFound(JsonConvert.SerializeObject("User not found", Formatting.Indented));



            List<MovieFirebase> wl = await WatchList.GetMoviesAsync(email);
            string json = JsonConvert.SerializeObject(wl, Formatting.Indented);

            return Ok(json);
        }


        [HttpPost("watchlist/Add")]
        public async Task<IActionResult> AddToWLAsync([FromHeader] string Authorization,[FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            int movie = userCred.MovieId;

            if (email == "" || movie == 0)
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            
            DbMethods.InitializeDB();

            if (await WatchList.IsInList(email, movie) == true)
                return NotFound(JsonConvert.SerializeObject("Already in list", Formatting.Indented));



            if (user.getUser(email) == null)
                return NotFound(JsonConvert.SerializeObject("User not found", Formatting.Indented));

            

            if (!(await WatchList.insertInWLAsync(email, movie)))
                return NotFound(JsonConvert.SerializeObject("Invalid user and movie", Formatting.Indented));

            return Ok(JsonConvert.SerializeObject(MovieMethods.GetMovie(movie), Formatting.Indented));
        }

        [HttpPost("watchlist/Remove")]
        public async Task<IActionResult> RemoveFromWLAsync([FromHeader] string Authorization, [FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            int movie = userCred.MovieId;

            DbMethods.InitializeDB();
            if (!(await WatchList.removeFromWLAsync(email,movie)))
                return NotFound(JsonConvert.SerializeObject("Invalid User and movie", Formatting.Indented));

            return Ok("200: description: Successfully removed movie from user Watchlist");
        }

    }
}
