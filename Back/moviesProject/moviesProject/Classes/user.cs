using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using moviesProject.Classes;



namespace moviesProject.Classes
{
    public class user
    {
        //User class vars
        public int uID;
        public String uName;
        public String uEmail;
        public String uPass;
        public bool isAdmin;

        public user(int uID, string uName, string uEmail, bool isAdmin)
        {
            this.uID = uID;
            this.uName = uName;
            this.uEmail = uEmail;
            this.isAdmin = isAdmin;
        }
        public user(int uID, string uName, string uEmail, string uPass, bool isAdmin)
        {
            this.uID = uID;
            this.uName = uName;
            this.uEmail = uEmail;
            this.uPass = uPass;
            this.isAdmin = isAdmin;
        }
        public user() {}

        private static MySqlConnection DbConn = DbMethods.dbget();

        public static bool authUser(String Email, String Pass)
        {
            
            String query = "SELECT * FROM users WHERE userEmail='"+Email+"' AND userPassword='"+Pass+"'";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            bool flag = false;
            if (reader.HasRows) flag = true;
            DbConn.Close();
            return flag;
        }

        public static async Task<user> getUser(String Email)
        {
            user user = null;
            try
            {
                await DbConn.OpenAsync();
                String query = "SELECT * FROM users WHERE userEmail='" + Email + "'";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                using (MySqlDataReader reader = (MySqlDataReader)await cmd.ExecuteReaderAsync())
                {
                    

                    while (reader.Read())
                    {
                        if (reader["userEmail"].ToString() != "")
                        {
                            int rid = (int)reader["userId"];
                            String ruName = reader["userName"].ToString();
                            String ruEmail = reader["userEmail"].ToString();
                            bool ruAdmin = (bool)reader["isAdmin"];
                            user = new user(rid, ruName, ruEmail, ruAdmin);
                        }
                    }
                    
                }
            }
            catch (MySqlException e) 
            {
                user = null;
            }
            await DbConn.CloseAsync();
            return user;
        }

        public static async Task<bool> insertUserAsync(string uName, string uEmail, string uPass)
        {
            bool flag = true;
            try
            {

                await DbConn.OpenAsync();
                String query = "INSERT INTO `users` (`userEmail`, `userName` , `userPassword`) VALUES('" + uEmail + "', '" + uName + "', '" + uPass + "')";
                using (MySqlCommand cmd = new MySqlCommand(query, DbConn))
                    await cmd.ExecuteReaderAsync();
            }
            catch (MySqlException e)
            {
                await DbConn.CloseAsync();
                flag = false;
            }
                await DbConn.CloseAsync();
                return flag;
            }
        
    }
}
