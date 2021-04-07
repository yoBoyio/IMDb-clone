using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Classes;

namespace moviesProject.Classes
{
    public class Rating
    {
        public int ratingId;
        public int movieId;
        public string userEmail;
        public string commentContent;
        public int rating;

        public Rating() { }

        public Rating(int ratingId, int movieId, string userEmail, string commentContent, int rating)
        {
            this.ratingId = ratingId;
            this.movieId = movieId;
            this.userEmail = userEmail;
            this.commentContent = commentContent;
            this.rating = rating;
        }

        private static MySqlConnection DbConn = DbMethods.dbget();

        public static async Task<List<Rating>> getMovieRatingsAsync(int MovieId) 
        {
            List<Rating> Rlist = new List<Rating>();
            try
            {
                
                await DbConn.OpenAsync();
                String query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {

                    Rating rating;

                    while (reader.Read())
                    {
                        int rid = (int)reader["ratingId"];
                        int movieId = (int)reader["movieId"];
                        String uEmail = reader["userEmail"].ToString();
                        String commentContent = reader["commentContent"].ToString();
                        int ratingScore = (int)reader["rating"];
                        rating = new Rating(rid, movieId, uEmail, commentContent, ratingScore);
                        Rlist.Add(rating);
                    }
                    
                }
                
            }
            catch (MySqlException e) 
            {
                DbConn.CloseAsync();
                
                return null;
            }
            DbConn.CloseAsync();
            return Rlist;
        }
        public static async Task<bool> insertRatingAsync(int movieId, string userEmail, string commentContent, int rating)
        {
            bool flag = true;
            try
            {
                await DbConn.OpenAsync();
                String query = "INSERT INTO `ratings` (`movieId`,`userEmail`, `commentContent` , `rating`) VALUES('" + movieId + "', '" + userEmail + "', '" + commentContent + "', '" + rating + "')";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                    cmd.ExecuteReaderAsync();

            }
            catch (Exception ex)
            {
                flag = false;
            }
            DbConn.CloseAsync();
            return flag;
        }

        public static async Task<decimal> getMovieAverageAsync(int MovieId)
        {
            Decimal average = 0;
            try
            {
                await DbConn.OpenAsync();
                String query = "SELECT SUM(rating)/COUNT(rating) AS AVERAGE FROM ratings WHERE movieId='" + MovieId + "'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {
                    reader.Read();
                    average = (Decimal)reader["AVERAGE"];
                }
            }
            catch (MySqlException e) 
            {
                average = 405;
            }
            await DbConn.CloseAsync();
            return average;
        }

    }
}
