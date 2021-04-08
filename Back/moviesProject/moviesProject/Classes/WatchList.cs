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

        public static async Task<List<Movie>> GetMoviesAsync(String uEmail)
        {
            try
            {

                await DbConn.OpenAsync();
                List<Movie> MovieList = new List<Movie>();
                String query = "SELECT movieId FROM watchlist WHERE userEmail='" + uEmail + "'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {
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
            }
            catch (MySqlException e) 
            {
                await DbConn.CloseAsync();
                return null;
            }

        }

        public static async Task<bool> insertInWLAsync(string uEmail, int MovieId)
        {
            try
            {
                await DbConn.OpenAsync();
                List<Movie> MovieList = new List<Movie>();
                String query = "INSERT INTO `watchlist` (`userEmail`, `movieId` ) VALUES('" + uEmail + "', " + MovieId + ")";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))   
                    cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                await DbConn.CloseAsync();
                return false;
            }

            await DbConn.CloseAsync();
            return true;
        }

        public static async Task<bool> IsInList(String Email,int movieId)
        {
            bool Flag = false;
            try
            {
                await DbConn.OpenAsync();
                
                String query = "SELECT movieId FROM watchlist WHERE userEmail='" + Email + "' AND movieId='"+movieId+"'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {

                    while (reader.Read())
                    {
                        if (reader["movieId"].ToString() != "")
                        {
                            Flag = true;
                        }
                    }
                    
                }
            }
            catch (MySqlException e)
            {
                Flag = true;
            }
            await DbConn.CloseAsync();
            return Flag;
        }

        public static async Task<bool> removeFromWLAsync(string uEmail,int MovieId) 
        {
            try
            {

                await DbConn.OpenAsync();
                List<Movie> MovieList = new List<Movie>();
                String query = "DELETE FROM `watchlist` WHERE userEmail='" + uEmail + "' AND movieId=" + MovieId + "";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                    await cmd.ExecuteReaderAsync();
            }
            catch (Exception ex) 
            {
                return false;
            }
            return true;
        }
    }
}
