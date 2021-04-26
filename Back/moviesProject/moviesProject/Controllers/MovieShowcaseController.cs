using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Classes;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace moviesProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieShowcaseController : ControllerBase
    {
        [HttpGet("Latest")]
        public async Task<IActionResult> getLatestAsync(int page)
        {
            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.GetPopular(page);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0) 
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("Upcoming")]
        public async Task<IActionResult> getUpCommingAsync(int page)
        {
            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.GetUpcoming(page);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("TopRated")]
        public async Task<IActionResult> getTopRated(int page)
        {
            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.GetTopRated(page);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("Search")]
        public async Task<IActionResult> SearchMovieQueryAsync(string query)
        {

            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.SearchMovie(query);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }


        [HttpGet("movie")]
        public async Task<IActionResult> getMovieAsync(int id)
        {
            MovieFirebase movie = await MovieMethods.GetMovie(id);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movie.id == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Movie not found");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject( movie , Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("Search/genre")]
        public async Task<IActionResult> SearchGerneMovieAsync(int genre, int page)
        {

            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.SearchGerneMovie(genre, page);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }

        [HttpGet("Search/lang")]
        public async Task<IActionResult> SearchlangMovieAsync(string lang, int page)
        {

            List<MovieFirebase> movies = new List<MovieFirebase>();
            movies = await MovieMethods.SearchLangMovie(lang, page);

            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            if (movies.Count == 0)
            {
                dictionary.Add("Message:", "Not Found");
                dictionary.Add("Description:", "Didnt find movies");
                return NotFound(JsonConvert.SerializeObject(dictionary, Formatting.Indented));
            }

            string json = JsonConvert.SerializeObject(movies, Formatting.Indented);
            return Ok(json);
        }
    }
}