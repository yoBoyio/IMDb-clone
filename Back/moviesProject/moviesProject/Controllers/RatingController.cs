using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Classes;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using moviesProject.Database;

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
            string email = "";
            if (Authorization!=null)
            email = tokenObj.GetNameClaims(Authorization);
            Dictionary<string, List<Rating>> dictionary = await RatingMethods.getMovieRatingsAsync(movieId,page,email);

            if (dictionary["Ratings"].Count == 0 || dictionary == null)
                return NotFound(JsonConvert.SerializeObject("Not found", Formatting.Indented));

            string json = JsonConvert.SerializeObject(dictionary, Formatting.Indented);

            await DbMethods.dbcloseAsync();
            return Ok(json);
        }

        // gurnaeu mono ena rating tou logged in user gia ena sugkekrimeno movie
        [HttpGet("get/userRating")]
        public async Task<IActionResult> GetMovieUserRatingsAsync([FromHeader] string Authorization, int movieId, int page)
        {
            string email = tokenObj.GetNameClaims(Authorization);
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            Rating rating = await RatingMethods.getMovieSingleRatingAsync(movieId, email);
            if (rating == null)
            {
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "Rating not found");
                return NotFound(dictionary);
            }

            await DbMethods.dbcloseAsync();
            return Ok(JsonConvert.SerializeObject(rating, Formatting.Indented));
        }


        // gurnaei likes dislikes kai percentage twn likes
        [AllowAnonymous]
        [HttpGet("get/stats")]
        public async Task<IActionResult> GetMovieAverageAsync(int movieId)
        {
            Dictionary<string, decimal> retDict = await RatingMethods.getMovieAverageAsync(movieId);
            if (retDict["percentage"] == -1)
            {
                Dictionary<string, string> dictionary = new Dictionary<string, string>();
                dictionary.Add("Message:", "NotFound");
                dictionary.Add("Description:", "Ratings not found");
                return NotFound(dictionary);
            }

            string json = JsonConvert.SerializeObject(retDict, Formatting.Indented);

            await DbMethods.dbcloseAsync();
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

            if (! (await RatingMethods.insertRatingAsync(movieId, email, commentContent, like)))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully inserted rating", Formatting.Indented);

            await DbMethods.dbcloseAsync();
            return Ok(json);
        }
        // diagrafei
        [HttpDelete("delete")]
        public async Task<IActionResult> deleteRatingsAsync([FromBody] UserCred userCred, [FromHeader] string Authorization)
        {
            int movieId = userCred.MovieId;
            string email = tokenObj.GetNameClaims(Authorization);

            if (!(await RatingMethods.deleteRatingAsync(movieId, email)))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully deleted rating", Formatting.Indented);

            await DbMethods.dbcloseAsync();
            return Ok(json);
        }

    }
}
