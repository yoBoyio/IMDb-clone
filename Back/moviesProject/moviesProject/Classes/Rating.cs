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

        public static async Task<Dictionary<string, List<Rating>>> getMovieRatingsAsync(int MovieId,int page,string userEmail) 
        {
            List<Rating> Rlist = new List<Rating>();
            List<Rating> userRating = new List<Rating>();
            Dictionary<string, List<Rating>> dictionary = new Dictionary<string, List<Rating>>();
            String query;
            Rating rating = new Rating(); ;
            try
            {
                
                await DbConn.OpenAsync();
                if (userEmail != "" && page==0)
                {
                    query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
                    using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                        using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                        {

                            reader.Read();
                            if (reader.HasRows)
                            {
                                int rid = (int)reader["ratingId"];
                                int movieId = (int)reader["movieId"];
                                String uEmail = reader["userEmail"].ToString();
                                String commentContent = reader["commentContent"].ToString();
                                bool like = (bool)reader["like"];
                                rating = new Rating(rid, movieId, uEmail, commentContent, like);
                                userRating.Add(rating);
                            }

                        }
                    dictionary.Add("UserRating", userRating);
                }
                query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail != '" + userEmail + "' LIMIT " + page*10+",10";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {


                    if (reader.HasRows)
                    {
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
                dictionary.Add("Ratings", Rlist);
            }
            catch (MySqlException e) 
            {
                DbConn.CloseAsync();
                
                return null;
            }
            DbConn.CloseAsync();


            return dictionary;
        }
        public static async Task<Rating> getMovieSingleRatingAsync(int MovieId, string userEmail)
        {
            await DbConn.OpenAsync();
            Rating rating= new Rating();
            String query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
            using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
            using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
            {
                
                    reader.Read();
                if (reader.HasRows)
                {
                    int rid = (int)reader["ratingId"];
                    int movieId = (int)reader["movieId"];
                    String uEmail = reader["userEmail"].ToString();
                    String commentContent = reader["commentContent"].ToString();
                    bool like = (bool)reader["like"];
                    rating = new Rating(rid, movieId, uEmail, commentContent, like);
                }
            }
            DbConn.CloseAsync();
            return rating;
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
        public static async Task<Dictionary<string, decimal>> getMovieAverageAsync(int MovieId)
        {
            decimal like=1,dislike=1,percentage;
            
            Dictionary<string, decimal> dictionary = new Dictionary<string, decimal>();
            try
            {
                await DbConn.OpenAsync();
                String query = "Select sum(case when `like` = 1 then 1 else 0 end) AS Truecount,sum(case when `like` = 0 then 1 else 0 end) AS Falsecount FROM ratings WHERE movieId=" + MovieId + "";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {
                    reader.Read();
                    like = (decimal)reader["Truecount"];
                    dislike = (decimal)reader["Falsecount"];
                }
            }
            catch (MySqlException e)
            {
                percentage = -1;
            }
            catch (Exception e1) { }
            await DbConn.CloseAsync();
            percentage = (like / (like + dislike)) * 100;
            dictionary.Add("likes", like);
            dictionary.Add("dislikes", dislike);
            dictionary.Add("percentage", percentage);
            return dictionary;
        }

    }
}
