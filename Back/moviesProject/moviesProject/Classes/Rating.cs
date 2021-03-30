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

        public static List<Rating> getMovieRatings(int MovieId) 
        {
            String query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "'";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            List<Rating> Rlist = new List<Rating>();
            Rating rating;

            while (reader.Read())
            {
                int rid = (int)reader["ratingId"];
                int movieId = (int)reader["movieId"];
                String uEmail = reader["userEmail"].ToString();
                String commentContent = reader["commentContent"].ToString();
                int ratingScore = (int)reader["rating"];
                rating = new Rating(rid,movieId,uEmail,commentContent,ratingScore);
                Rlist.Add(rating);
            }
            DbConn.Close();
            return Rlist;
        }
        public static bool insertRating(int movieId, string userEmail, string commentContent, int rating)
        {
            try
            {
                String query = "INSERT INTO `ratings` (`movieId`,`userEmail`, `commentContent` , `rating`) VALUES('" + movieId + "', '" + userEmail + "', '" + commentContent + "', '" + rating + "')";
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

        public static Decimal getMovieAverage(int MovieId)
        {
            String query = "SELECT SUM(rating)/COUNT(rating) AS AVERAGE FROM ratings WHERE movieId='" + MovieId + "'";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            reader.Read();

            Decimal average = (Decimal)reader["AVERAGE"];
            
            DbConn.Close();
            return average;
        }

    }
}
