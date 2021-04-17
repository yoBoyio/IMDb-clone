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
        public bool like;

        public Rating() { }

        public Rating(int ratingId, int movieId, string userEmail, string commentContent, bool like)
        {
            this.ratingId = ratingId;
            this.movieId = movieId;
            this.userEmail = userEmail;
            this.commentContent = commentContent;
            this.like = like;
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
                        bool like = (bool)reader["like"];
                        rating = new Rating(rid, movieId, uEmail, commentContent, like);
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
        public static async Task<bool> insertRatingAsync(int movieId, string userEmail, string commentContent, int like)
        {
            bool flag = true;
            try
            {
                await DbConn.OpenAsync();
                String query = "REPLACE INTO ratings VALUES (0," + movieId + ",'" + userEmail+"','"+commentContent+"',"+like+")";
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
        public static async Task<bool> deleteRatingAsync(int movieId, string userEmail)
        {
            bool flag = true;
            try
            {
                await DbConn.OpenAsync();
                String query = "DELETE  FROM RATINGS WHERE movieId = '" + movieId + "' AND userEmail = '"+userEmail+"'";
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
            Decimal like=1,dislike=1,percentage;
            try
            {
                await DbConn.OpenAsync();
                String query = "Select sum(case when `like` = 1 then 1 else 0 end) AS Truecount,sum(case when `like` = 0 then 1 else 0 end) AS Falsecount FROM ratings WHERE movieId='" + MovieId + "'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {
                    reader.Read();
                    like = (Decimal)reader["Truecount"];
                    dislike = (Decimal)reader["Falsecount"];
                }
            }
            catch (MySqlException e) 
            {
                percentage = -1;
            }
            await DbConn.CloseAsync();
            percentage = (like / (like + dislike)) * 100;
            return percentage;
        }

    }
}
