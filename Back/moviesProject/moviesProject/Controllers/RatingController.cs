using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Classes;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace moviesProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {

        // gurnaei ena pinaka me 2 antikeimena prwto to userrating kai deftero mia lista me 10 rating sta opoia den uparxei to rate tou user,
        // meta apo to 0 page to user rating den gurnaei alla mono dekades apo ratings ana page
        [AllowAnonymous]
        [HttpGet("get")]
        public async Task<IActionResult> GetMovieRatingsAsync([FromHeader] string Authorization, int movieId, int page)
        {
            DbMethods.InitializeDB();
            string email = "";
            if (Authorization!=null)
            email = tokenObj.GetNameClaims(Authorization);
            Dictionary<string, List<Rating>> dictionary = await Rating.getMovieRatingsAsync(movieId,page,email);

            if (dictionary["Ratings"].Count == 0)
                return NotFound(JsonConvert.SerializeObject("Not found", Formatting.Indented));

            string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);

            return Ok(json);
        }
        // gurnaeu mono ena rating tou logged in user gia ena sugkekrimeno movie
        [HttpGet("get/userRating")]
        public async Task<IActionResult> GetMovieUserRatingsAsync([FromHeader] string Authorization, int movieId, int page)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            DbMethods.InitializeDB();
            Rating rating = await Rating.getMovieSingleRatingAsync(movieId, email);
            if (rating.ratingId == 0)
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "Rating not found");
                return NotFound(dictionary);
            }
            return Ok(JsonConvert.SerializeObject(rating, Formatting.Indented));
        }


        // gurnaei likes dislikes kai percentage twn likes
        [AllowAnonymous]
        [HttpGet("get/stats")]
        public async Task<IActionResult> GetMovieAverageAsync(int movieId)
        {
            DbMethods.InitializeDB();
            string json = JsonConvert.SerializeObject(await Rating.getMovieAverageAsync(movieId));

            return Ok(json);
        }

        // kanei insert rating
        [HttpPost("insert")]
        public async Task<IActionResult> insertRatingsAsync([FromBody] UserCred userCred, [FromHeader] string Authorization)
        {
            int movieId = userCred.MovieId;
            string email = tokenObj.GetNameClaims(Authorization);
            string commentContent = userCred.commentContent;
            bool like = userCred.like;
            
            int likepass=0;
            if (like)
                likepass = 1;

            DbMethods.InitializeDB();

            if (! (await Rating.insertRatingAsync(movieId, email, commentContent, likepass)))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully inserted rating", Formatting.Indented);

            return Ok(json);
        }

        // diagrafei
        [HttpPost("delete")]
        public async Task<IActionResult> deleteRatingsAsync([FromBody] UserCred userCred, [FromHeader] string Authorization)
        {
            int movieId = userCred.MovieId;
            string email = tokenObj.GetNameClaims(Authorization);

            DbMethods.InitializeDB();

            if (!(await Rating.deleteRatingAsync(movieId, email)))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully deleted rating", Formatting.Indented);

            return Ok(json);
        }

    }
}
