using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moviesProject.Classes
{

    public class WatchList
    {
     

        private static MySqlConnection DbConn = DbMethods.dbget();

        WatchList() { }

        public static List<Movie> GetMovies(String uEmail)
        {
            
            String query = "SELECT movieId FROM watchlist WHERE userEmail='"+uEmail+"'";
            List<Movie> MovieList = new List<Movie>();
            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                Movie movie = new Movie();
                int movieId = (int)reader["movieId"];
                movie = Movie.getMovie(movieId);
                MovieList.Add(movie);
            }

            DbConn.Close();
            return MovieList;
        }

        public static bool insertInWL(string uEmail, int MovieId)
        {
            try
            {
                String query = "INSERT INTO `watchlist` (`userEmail`, `movieId` ) VALUES('" + uEmail + "', " + MovieId + ")";
            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            cmd.ExecuteNonQuery();
            DbConn.Close();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public static bool removeFromWL(string uEmail,int MovieId) 
        {
            try
            {
                String query = "DELETE FROM `watchlist` WHERE userEmail='" + uEmail + "' AND movieId=" + MovieId + "";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                DbConn.Open();
                cmd.ExecuteNonQuery();
                DbConn.Close();
            }
            catch (Exception ex) 
            {
                return false;
            }
            return true;
        }
    }
}
