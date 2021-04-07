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
        [HttpGet("get")]
        public async Task<IActionResult> GetMovieRatingsAsync(int movieId)
        {
            DbMethods.InitializeDB();

            List<Rating> Rlist = await Rating.getMovieRatingsAsync(movieId);
            if (Rlist.Count == 0)
                return NotFound(JsonConvert.SerializeObject("Not found", Formatting.Indented));

            string json = JsonConvert.SerializeObject(Rlist, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("get/average")]
        public async Task<IActionResult> GetMovieAverageAsync(int movieId)
        {
            DbMethods.InitializeDB();
            string json = JsonConvert.SerializeObject(await Rating.getMovieAverageAsync(movieId));

            return Ok(json);
        }


        [HttpPost("insert")]
        public async Task<IActionResult> insertRatingsAsync([FromBody] UserCred userCred)
        {
            int movieId = userCred.MovieId;
            string userEmail = userCred.Email;
            string commentContent = userCred.commentContent;
            int ratingScore = userCred.rating;

            DbMethods.InitializeDB();

            if (! (await Rating.insertRatingAsync(movieId, userEmail, commentContent, ratingScore)))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully inserted user", Formatting.Indented);

            return Ok(json);
        }
    }
}
