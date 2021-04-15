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
    }
}
