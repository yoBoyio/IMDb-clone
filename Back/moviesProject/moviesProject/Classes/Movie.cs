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

            string sURL;
            // Create a request for the URL.
            WebRequest request = WebRequest.Create(
              "https://api.themoviedb.org/3/movie/now_playing?api_key=2eff1592c2104c03f9098af2aee54824&language=en-US&page="+page);
            // If required by the server, set the credentials.
            request.Credentials = CredentialCache.DefaultCredentials;

            // Get the response.
            WebResponse response = request.GetResponse();
            // Display the status.
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);

            // Get the stream containing content returned by the server.
            // The using block ensures the stream is automatically closed.
            ;
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
                    movie.Title= item["title"].Value<string>();
                    movie.Poster_path= item["poster_path"].Value<string>();
                    movie.Vote_average= item["vote_average"].Value<double>();
                    MovieList.Add(movie);
                }
                return MovieList;
            }
        }
    }
}
