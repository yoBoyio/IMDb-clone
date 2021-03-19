using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using moviesProject.Classes;



namespace moviesProject.Controllers
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

        public static List<user> GetUsers() 
        {
            List<user> uList = new List<user>();
            String query = "Select * from users";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read()) 
            {
                int rid = (int)reader["userId"];
                String ruName = reader["userName"].ToString();
                String ruEmail = reader["userEmail"].ToString();
                String ruPass = reader["userPassword"].ToString();
                bool ruAdmin = (bool)reader["isAdmin"];

                user userData = new user(rid, ruName, ruEmail, ruPass, ruAdmin);
                
                uList.Add(userData);
            }

            DbConn.Close();
            return uList;
        }
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
        public static user getUser(String Email)
        {

            String query = "SELECT * FROM users WHERE userEmail='" + Email+"'";

            MySqlCommand cmd = new MySqlCommand(query, DbConn);
            DbConn.Open();
            MySqlDataReader reader = cmd.ExecuteReader();

            user user = new user();

            while (reader.Read())
            {
                int rid = (int)reader["userId"];
                String ruName = reader["userName"].ToString();
                String ruEmail = reader["userEmail"].ToString();
                bool ruAdmin = (bool)reader["isAdmin"];
                user = new user(rid, ruName, ruEmail, ruAdmin);
            }
            DbConn.Close();
            return user;
        }
        public static bool insertUser(string uName, string uEmail, string uPass)
        {
            try
            {
                String query = "INSERT INTO `users` (`userEmail`, `userName` , `userPassword`) VALUES('" + uEmail + "', '" + uName + "', '" + uPass + "')";
                MySqlCommand cmd = new MySqlCommand(query, DbConn);
                DbConn.Open();
                cmd.ExecuteNonQuery();
                DbConn.Close();
            }catch(Exception ex)
            {
                return false;
            }
            return true;
        }
        
    }
}
