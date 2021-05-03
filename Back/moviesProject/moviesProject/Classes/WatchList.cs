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

        public static async Task<List<MovieFirebase>> GetMoviesAsync(String uEmail)
        {
            List<MovieFirebase> MovieList = new List<MovieFirebase>();
            try
            {

                DbConn.Open();
                String query = "SELECT movieId FROM watchlist WHERE userEmail='" + uEmail + "'";

                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                    {
                        MovieFirebase movie = new MovieFirebase();
                        int movieId = (int)reader["movieId"];
                        movie = await MovieMethods.GetMovie(movieId);
                        MovieList.Add(movie);
                    }
            }
            catch (MySqlException e) 
            {
                DbConn.Close();
                return null;
            }

            DbConn.Close();
            return MovieList;
        }

        public static bool insertInWL(string uEmail, int MovieId)
        {
            try
            {
                DbConn.Open();
                List<Movie> MovieList = new List<Movie>();
                String query = "INSERT INTO `watchlist` (`userEmail`, `movieId` ) VALUES('" + uEmail + "', " + MovieId + ")";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }

            DbConn.Close();
            return true;
        }

        public static bool IsInList(String Email, int movieId)
        {
            bool Flag = false;
            try
            {
                DbConn.Open();

                String query = "SELECT movieId FROM watchlist WHERE userEmail='" + Email + "' AND movieId='" + movieId + "'";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    if (reader["movieId"].ToString() != "")
                    {
                        Flag = true;
                    }
                }

            }
            catch (MySqlException e)
            {
                Flag = true;
            }
            DbConn.Close();
            return Flag;
        }

        public static bool removeFromWL(string uEmail, int MovieId)
        {
            try
            {
                DbConn.Open();
                String query = "DELETE FROM `watchlist` WHERE userEmail='" + uEmail + "' AND movieId=" + MovieId + "";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return false;
            }
            DbConn.Close();
            return true;
        }
    }
}
