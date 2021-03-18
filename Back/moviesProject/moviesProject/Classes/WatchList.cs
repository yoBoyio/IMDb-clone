using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moviesProject.Classes
{

    public class WatchList
    {
        public List<String> movies = new List<string>();

        private static MySqlConnection DbConn = DbMethods.dbget();

        WatchList() { }

        public static WatchList GetMovies(String uEmail)
        {
            
            String query = "SELECT movieId FROM watchlist WHERE userEmail='"+uEmail+"'";
            WatchList wl = new WatchList();
            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                
                String movieId = reader["movieId"].ToString();
                

                wl.movies.Add(movieId);
            }

            DbConn.Close();
            return wl;
        }

        public static void insertInWL(string uEmail, string MovieId)
        {
            String query = "INSERT INTO `watchlist` (`userEmail`, `movieId` ) VALUES('" + uEmail + "', '" + MovieId + "')";
            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            cmd.ExecuteNonQuery();
            DbConn.Close();
        }
    }
}
