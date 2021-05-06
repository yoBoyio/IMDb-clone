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
using moviesProject.Database;

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

            string email = tokenObj.GetNameClaims(Authorization);

            User user = await UserMethods.getUser(email);

            if (user==null)
                return NotFound(JsonConvert.SerializeObject("User does not exist", Formatting.Indented));

            string json = JsonConvert.SerializeObject(user, Formatting.Indented);
            return Ok(json);
        }

        [HttpPost("ChangePass")]
        public async Task<IActionResult> GetUserAsync([FromHeader] string Authorization, [FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            string password = userCred.Password;
            string newPassword = userCred.newPassword;


            if (email == "" || password == "" || newPassword == "")
            {
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            }

            User user = await UserMethods.getUser(email);

            if (user == null)
                return NotFound(JsonConvert.SerializeObject("User does not exist", Formatting.Indented));

            if (!UserMethods.authUser(email,password))
                return NotFound(JsonConvert.SerializeObject("Wrong Password", Formatting.Indented));

            if (! (await UserMethods.ChangePass(email,password,newPassword)))
                return NotFound(JsonConvert.SerializeObject("Something went wrong", Formatting.Indented));

            string json = JsonConvert.SerializeObject("Password changed!", Formatting.Indented);
            return Ok(json);
        }

        // (url)/api/Users/signup {POST} Json Body: {"Email":" ", "Name":" ", "Password":" "} | Inserts User-----------------------
        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<IActionResult> PostUserAsync([FromBody] UserCred userCred)
        {
            var name= userCred.Name;
            var email = userCred.Email ;
            var password = userCred.Password;
          
            // validate fields
            if ( name ==null || email==null || password == null)
                return NotFound(JsonConvert.SerializeObject("Please enter all fields", Formatting.Indented));
            

            // check  if user exists
            if (await UserMethods.getUser(email)!=null)
                return NotFound(JsonConvert.SerializeObject("User already exists", Formatting.Indented));

            //check if user saved
            bool savedUser= await UserMethods.insertUserAsync(name, email, password);
            if(!savedUser)
                return NotFound(JsonConvert.SerializeObject("Something went wrong saving the user", Formatting.Indented));

            return Ok("200: description: Successfully inserted user");
        }


        // (url)/api/Users/login {POST} Json Body: {"Email":" " , "Password":" "} | returns Token----------------------------------
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] UserCred userCred)
        {
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

            User user = await UserMethods.getUser(email);
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
            Dictionary<string, string> dictionary = new Dictionary<string, string>();

            string email = tokenObj.GetNameClaims(Authorization);
            if (email == "")
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "Please enter all fields");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            if (await UserMethods.getUser(email) == null)
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "User not found");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }


            List<MovieFirebase> wl = await WatchListMethods.GetMoviesAsync(email);

            if (wl.Count == 0 || wl == null)
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "WatchList is empty");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(wl, Formatting.Indented);

            return Ok(json);
        }


        [HttpPost("watchlist/insert")]
        public async Task<IActionResult> AddToWLAsync([FromHeader] string Authorization,[FromBody] UserCred userCred)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            int movie = userCred.MovieId;
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            

            if (email == "" || movie == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Please enter all fields");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            if (await WatchListMethods.IsInList(email, movie) == true)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Please enter all fields");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            

            if (UserMethods.getUser(email) == null)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "User not found");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            MovieFirebase retMov = await MovieMethods.GetMovie(movie);

            if (retMov.id == 0)
            {
                dictionary.Add("Message:", " Not Found");
                dictionary.Add("Description:", "Movie Not Found");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            if (!(await WatchListMethods.insertInWLAsync(email, movie)))
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "Something went wrong");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }
            
            return Ok(JsonConvert.SerializeObject(retMov, Formatting.Indented));
        }

        [HttpDelete("watchlist/Remove")]
        public async Task<IActionResult> RemoveFromWLAsync([FromHeader] string Authorization, [FromBody] UserCred userCred)
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            string email = tokenObj.GetNameClaims(Authorization);
            int movie = userCred.MovieId;


            if (await WatchListMethods.IsInList(email, movie) == false)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Not Found In List");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            if (!(await WatchListMethods.removeFromWLAsync(email, movie)))
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Something went wrong");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }
            dictionary.Add("Message:","OK");
            dictionary.Add("Description:", "Successfully removed movie from user Watchlist");
            return Ok(JsonConvert.SerializeObject(dictionary));
        }

    }
}
