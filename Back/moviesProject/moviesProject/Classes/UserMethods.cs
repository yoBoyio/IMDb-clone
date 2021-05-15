using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using moviesProject.Classes;
using moviesProject.Database;
using Microsoft.EntityFrameworkCore;

namespace moviesProject.Classes
{
    public class UserMethods
    {

        public static bool authUser(String Email, String Pass)
        {
            moviesProjectContext context = new moviesProjectContext();
            bool flag = false;
            try
            {

            //query = "SELECT * FROM users WHERE userEmail='"+Email+"' AND userPassword='"+Pass+"'";

            if (context.Users.Any(x => x.UserEmail == Email && x.UserPassword == Pass ))
                flag = true;
            

            }catch(Exception ex)
            {
                flag = false;
            }

            return flag;
        }

        public static async Task<User> getUser(String Email)
        {
            moviesProjectContext context = new moviesProjectContext();

            User user = null;

            try
            {
                // query = "SELECT * FROM users WHERE userEmail='" + Email + "'";
                user = await context.Users.AsQueryable().SingleOrDefaultAsync(x => x.UserEmail == Email);
            }
            catch (Exception e) 
            {
                user = null;
            }
            return user;
        }

        public static async Task<bool> insertUserAsync(string uName, string uEmail, string uPass)
        {
            moviesProjectContext context = new moviesProjectContext();

            bool flag = true;
            
            try
            {

                //query = "INSERT INTO `users` (`userEmail`, `userName` , `userPassword`) VALUES('" + uEmail + "', '" + uName + "', '" + uPass + "')";
                    await context.Users.AddAsync(new User()
                    {
                        UserEmail = uEmail,
                        UserName = uName,
                        UserPassword = uPass, 
                        IsAdmin = false               
                    });
                await context.SaveChangesAsync();

            }
            catch (Exception e)
            {
                flag = false;
            }
            
            return flag;
        }
        public static async Task<bool> ChangePass(string uEmail, string uPass, string newPass)
        {
            moviesProjectContext context = new moviesProjectContext();

            bool flag =false;
            
            try
            {
                if (await context.Users.AsQueryable().AnyAsync(x => x.UserEmail == uEmail && x.UserPassword == uPass))
                {
                    var item = await context.Users.AsQueryable().SingleAsync(x => x.UserEmail == uEmail && x.UserPassword == uPass);
                    item.UserPassword = newPass;
                    flag = true;
                }
                await context.SaveChangesAsync();

            }
            catch (Exception e)
            {
                flag = false;
            }
            
            return flag;
        }

    }
}
