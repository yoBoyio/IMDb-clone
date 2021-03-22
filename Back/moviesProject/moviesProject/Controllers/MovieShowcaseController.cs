using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Classes;
using Newtonsoft;
using Newtonsoft.Json;

namespace moviesProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieShowcaseController : ControllerBase
    {
        [HttpGet("Latest")]
        public IActionResult getLatest(int page)
        {
            List<Movie> movies = new List<Movie>();
            movies= Movie.getLatest(page);
            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("Upcomming")]
        public IActionResult getUpComming(int page)
        {
            List<Movie> movies = new List<Movie>();
            movies = Movie.getUpcoming(page);
            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("getTopRated")]
        public IActionResult getTopRated(int page)
        {
            List<Movie> movies = new List<Movie>();
            movies = Movie.getTopRated(page);
            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("search")]
        public IActionResult getTopRated(int page,string query)
        {

            List<Movie> movies = new List<Movie>();
            movies = Movie.searchMovies(query,page);
            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }


    }
}
