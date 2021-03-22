using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Net;
using System.IO;
using Newtonsoft;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace moviesProject.Classes
{
    public class Movie
    {
        public int Id;
        public string Title;
        public string Poster_path;
        public double Vote_average;

        public static List<Movie> getLatest(int page)
        {
            if (page == 0) page = 1;
            // Create a request for the URL.
            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/movie/now_playing?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US&page=" + page);
            // If required by the server, set the credentials.
            request.Credentials = CredentialCache.DefaultCredentials;

            // Get the response.
            WebResponse response = request.GetResponse();
            // Display the status.
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);

            // Get the stream containing content returned by the server.
            // The using block ensures the stream is automatically closed.

            using (Stream dataStream = response.GetResponseStream())
            {
                // Open the stream using a StreamReader for easy access.
                StreamReader reader = new StreamReader(dataStream);
                // Read the content.
                string json = reader.ReadToEnd();
                var data = (JObject)JsonConvert.DeserializeObject(json);

                List<Movie> MovieList = new List<Movie>();

                foreach (var item in data["results"])
                {
                    Movie movie = new Movie();
                    movie.Id = item["id"].Value<int>();
                    movie.Title = item["title"].Value<string>();
                    movie.Poster_path = "https://image.tmdb.org/t/p/w500" + item["poster_path"].Value<string>();
                    movie.Vote_average = item["vote_average"].Value<double>();
                    MovieList.Add(movie);
                }
                return MovieList;
            }
        }

        public static List<Movie> getUpcoming(int page)
        {
            if (page == 0) page = 1;

            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/movie/upcoming?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US&page=" + page);

            request.Credentials = CredentialCache.DefaultCredentials;

            WebResponse response = request.GetResponse();
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string json = reader.ReadToEnd();
                var data = (JObject)JsonConvert.DeserializeObject(json);

                List<Movie> MovieList = new List<Movie>();

                foreach (var item in data["results"])
                {
                    Movie movie = new Movie();
                    movie.Id = item["id"].Value<int>();
                    movie.Title = item["title"].Value<string>();
                    movie.Poster_path = "https://image.tmdb.org/t/p/w500" + item["poster_path"].Value<string>();
                    movie.Vote_average = item["vote_average"].Value<double>();
                    MovieList.Add(movie);
                }
                return MovieList;
            }
        }
        public static List<Movie> getTopRated(int page)
        {
            if (page == 0) page = 1;
            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/movie/top_rated?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US&page=" + page);

            request.Credentials = CredentialCache.DefaultCredentials;

            WebResponse response = request.GetResponse();
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string json = reader.ReadToEnd();
                var data = (JObject)JsonConvert.DeserializeObject(json);

                List<Movie> MovieList = new List<Movie>();

                foreach (var item in data["results"])
                {
                    Movie movie = new Movie();
                    movie.Id = item["id"].Value<int>();
                    movie.Title = item["title"].Value<string>();
                    movie.Poster_path = "https://image.tmdb.org/t/p/w500" + item["poster_path"].Value<string>();
                    movie.Vote_average = item["vote_average"].Value<double>();
                    MovieList.Add(movie);
                }
                return MovieList;
            }
        }

        public static Movie getMovie(int id)
        {

            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/movie/" + id + "?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US");

            request.Credentials = CredentialCache.DefaultCredentials;

            WebResponse response = request.GetResponse();
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string json = reader.ReadToEnd();
                var data = (JObject)JsonConvert.DeserializeObject(json);

                Movie movie = new Movie();
                movie.Id = data["id"].Value<int>();
                movie.Title = data["title"].Value<string>();
                movie.Poster_path = "https://image.tmdb.org/t/p/w500" + data["poster_path"].Value<string>();
                movie.Vote_average = data["vote_average"].Value<double>();
                return movie;
            }

        }

        public static List<Movie> searchMovies(string query,int page)
        {
            if (page == 0) page = 1;
            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/search/movie?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US&query="+query+"&include_adult=false&page=" + page);

            request.Credentials = CredentialCache.DefaultCredentials;

            WebResponse response = request.GetResponse();
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string json = reader.ReadToEnd();
                var data = (JObject)JsonConvert.DeserializeObject(json);

                List<Movie> MovieList = new List<Movie>();

                foreach (var item in data["results"])
                {
                    Movie movie = new Movie();
                    movie.Id = item["id"].Value<int>();
                    movie.Title = item["title"].Value<string>();
                    movie.Poster_path = "https://image.tmdb.org/t/p/w500" + item["poster_path"].Value<string>();
                    movie.Vote_average = item["vote_average"].Value<double>();
                    MovieList.Add(movie);
                }
                return MovieList;
            }
        }
    }
} 

