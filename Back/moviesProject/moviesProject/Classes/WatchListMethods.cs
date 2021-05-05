using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moviesProject.Database;
using Microsoft.EntityFrameworkCore;

namespace moviesProject.Classes
{

    public class WatchListMethods
    {
     

        private static MySqlConnection DbConn = DbMethods.dbget();

        public static async Task<List<MovieFirebase>> GetMoviesAsync(String uEmail)
        {
            moviesProjectContext context = new moviesProjectContext();

            try
            {

                List<MovieFirebase> MovieList = new List<MovieFirebase>();
                //query = "SELECT movieId FROM watchlist WHERE userEmail='" + uEmail + "'";

                var movies = context.Watchlists.AsQueryable().Where(x => x.UserEmail.Equals(uEmail)).ToList();

                foreach(Watchlist item in movies)
                {
                    MovieFirebase movie = new MovieFirebase();
                    movie =await MovieMethods.GetMovie(item.MovieId);
                    MovieList.Add(movie);
                }

                return MovieList;
            }
            catch (Exception e) 
            {
                return null;
            }

        }

        public static async Task<bool> insertInWLAsync(string uEmail, int MovieId)
        {
            moviesProjectContext context = new moviesProjectContext();

            try
            {
                //query = "INSERT INTO `watchlist` (`userEmail`, `movieId` ) VALUES('" + uEmail + "', " + MovieId + ")";
                await context.Watchlists.AddAsync(new Watchlist()
                    {
                        UserEmail = uEmail,
                        MovieId = MovieId     
                    });
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return false;
            }


            return true;
        }

        public static async Task<bool> IsInList(String Email,int movieId)
        {
            moviesProjectContext context = new moviesProjectContext();

            bool Flag = false;
            try
            {
            
                //query = "SELECT movieId FROM watchlist WHERE userEmail='" + Email + "' AND movieId='"+movieId+"'";
                if(await context.Watchlists.AnyAsync(x => x.UserEmail == Email && x.MovieId == movieId))
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                Flag = true;
            }
            return Flag;
        }

        public static async Task<bool> removeFromWLAsync(string uEmail,int MovieId) 
        {
            moviesProjectContext context = new moviesProjectContext();

            try
            {
                List<Movie> MovieList = new List<Movie>();
                // query = "DELETE FROM `watchlist` WHERE userEmail='" + uEmail + "' AND movieId=" + MovieId + "";
                var itemToRemove =await context.Watchlists.SingleOrDefaultAsync(x => x.MovieId == MovieId && x.UserEmail.ToUpper() == uEmail.ToUpper() ); //returns a single item.

                if (itemToRemove != null) {
                    context.Watchlists.Remove(itemToRemove);
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex) 
            {
                return false;
            }
            return true;
        }
    }
}
