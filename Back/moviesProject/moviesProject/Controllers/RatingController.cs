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
        public IActionResult GetMovieRatings(int movieId)
        {
            DbMethods.InitializeDB();

            List<Rating> Rlist = Rating.getMovieRatings(movieId);
            string json = JsonConvert.SerializeObject(Rlist, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("get/average")]
        public IActionResult GetMovieAverage(int movieId)
        {
            DbMethods.InitializeDB();
            string json = JsonConvert.SerializeObject(Rating.getMovieAverage(movieId));

            return Ok(json);
        }


        [HttpPost("insert")]
        public IActionResult insertRatings([FromBody] UserCred userCred)
        {
            int movieId = userCred.MovieId;
            string userEmail = userCred.Email;
            string commentContent = userCred.commentContent;
            int ratingScore = userCred.rating;

            DbMethods.InitializeDB();

            if (!Rating.insertRating(movieId, userEmail, commentContent, ratingScore))
                return NotFound();

            string json = JsonConvert.SerializeObject("200: description: Successfully inserted user", Formatting.Indented);

            return Ok(json);
        }
    }
}
