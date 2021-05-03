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
            bool flag = false;
            try
            {

            String query = "SELECT * FROM users WHERE userEmail='"+Email+"' AND userPassword='"+Pass+"'";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows) flag = true;
            }catch(MySqlException ex)
            {
                flag = false;
            }
            DbConn.Close();
            return flag;
        }

        public static user getUser(String Email)
        {
            user user = null;
            try
            {
                String query = "SELECT * FROM users WHERE userEmail='" + Email + "'";

                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                DbConn.Open();
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    int rid = (int)reader["userId"];
                    String ruName = reader["userName"].ToString();
                    String ruEmail = reader["userEmail"].ToString();
                    bool ruAdmin = (bool)reader["isAdmin"];
                    user = new user(rid, ruName, ruEmail, ruAdmin);
                }
            }
            catch (MySqlException e) 
            {
                user = null;
            }
            DbConn.Close();
            return user;
        }

        public static bool insertUser(string uName, string uEmail, string uPass)
        {
            bool flag = true;
            try
            {

                String query = "INSERT INTO `users` (`userEmail`, `userName` , `userPassword`) VALUES('" + uEmail + "', '" + uName + "', '" + uPass + "')";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                DbConn.Open();
                cmd.ExecuteNonQuery();
                
            }
            catch (MySqlException e)
            {
                flag = false;
            }
            DbConn.Close();
            return flag;
            }
        
    }
}
