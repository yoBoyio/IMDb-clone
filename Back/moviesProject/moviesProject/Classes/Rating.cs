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

        public static Dictionary<string, List<Rating>> getMovieRatings(int MovieId, int page, string userEmail)
        {
            List<Rating> Rlist = new List<Rating>();
            List<Rating> userRating = new List<Rating>();
            Dictionary<string, List<Rating>> dictionary = new Dictionary<string, List<Rating>>();
            String query;
            Rating rating = new Rating(); ;
            try
            {

                DbConn.Open();
                if (userEmail != "" && page == 0)
                {
                    query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
                    MySqlCommand cmdR = new MySqlCommand(query, DbConn);
                    MySqlDataReader readerR = cmdR.ExecuteReader();

                    readerR.Read();
                    if (readerR.HasRows)
                    {
                        int rid = (int)readerR["ratingId"];
                        int movieId = (int)readerR["movieId"];
                        String uEmail = readerR["userEmail"].ToString();
                        String commentContent = readerR["commentContent"].ToString();
                        bool like = (bool)readerR["like"];
                        rating = new Rating(rid, movieId, uEmail, commentContent, like);
                        userRating.Add(rating);
                    }


                    dictionary.Add("UserRating", userRating);
                    DbConn.Close();
                }
                DbConn.Open();

                query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail != '" + userEmail + "' LIMIT " + page * 10 + ",10";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                MySqlDataReader reader = cmd.ExecuteReader();

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
                dictionary.Add("Ratings", Rlist);
            }
            catch (MySqlException e)
            {
                DbConn.Close();
                return null;
            }

            DbConn.Close();
            return dictionary;
        }
        public static Rating getMovieSingleRating(int MovieId, string userEmail)
        {
            DbConn.Open();
            Rating rating = new Rating();
            String query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            MySqlDataReader reader = cmd.ExecuteReader();

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

            DbConn.Close();
            return rating;
        }
        public static bool insertRating(int movieId, string userEmail, string commentContent, int like)
        {
            bool flag = true;
            try
            {
                DbConn.Open();
                String query = "REPLACE INTO ratings VALUES (0," + movieId + ",'" + userEmail + "','" + commentContent + "'," + like + ")";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                cmd.ExecuteReader();

            }
            catch (Exception ex)
            {
                flag = false;
            }
            DbConn.Close();
            return flag;
        }
        public static bool deleteRating(int movieId, string userEmail)
        {
            bool flag = true;
            try
            {
                DbConn.Open();
                String query = "DELETE  FROM RATINGS WHERE movieId = '" + movieId + "' AND userEmail = '" + userEmail + "'";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                cmd.ExecuteReader();

            }
            catch (Exception ex)
            {
                flag = false;
            }
            DbConn.Close();
            return flag;
        }
        public static Dictionary<string, decimal> getMovieAverage(int MovieId)
        {
            decimal like = 0, dislike = 0, percentage = 0;

            Dictionary<string, decimal> dictionary = new Dictionary<string, decimal>();
            try
            {
                DbConn.Open();
                String query = "Select sum(case when `like` = 1 then 1 else 0 end) AS Truecount,sum(case when `like` = 0 then 1 else 0 end) AS Falsecount FROM ratings WHERE movieId=" + MovieId + "";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                MySqlDataReader reader = cmd.ExecuteReader();
                reader.Read();
                like = (decimal)reader["Truecount"];
                dislike = (decimal)reader["Falsecount"];

            }
            catch (Exception e1)
            {
                percentage = -1;
            }
            DbConn.Close();

            if (like > 0 || dislike > 0)
                percentage = (like / (like + dislike)) * 100;

            dictionary.Add("likes", like);
            dictionary.Add("dislikes", dislike);
            dictionary.Add("percentage", percentage);

            return dictionary;
        }

    }
}
