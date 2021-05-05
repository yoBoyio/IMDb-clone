using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using moviesProject.Classes;
using moviesProject.Database;

namespace moviesProject.Classes
{
    public static class RatingMethods
    {
        public static async Task<Dictionary<string, List<Rating>>> getMovieRatingsAsync(int MovieId,int page,string userEmail) 
        {
            moviesProjectContext context = new moviesProjectContext();

            List<Rating> Rlist = new List<Rating>();
            List<Rating> userRating = new List<Rating>();
            Dictionary<string, List<Rating>> dictionary = new Dictionary<string, List<Rating>>();
            Rating rating = new Rating();

            if (page == 0)
                page = 1; 

            try
            {
                if (userEmail != "" && page==1)
                {
                    //query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
                    rating = await context.Ratings.SingleOrDefaultAsync(x => x.UserEmail == userEmail && x.MovieId == MovieId );
                    userRating.Add(rating);

                    dictionary.Add("UserRating", userRating);
                }

                //query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail != '" + userEmail + "' LIMIT " + page*10+",10";
                Rlist = context.Ratings.AsQueryable().Where(x => x.MovieId == MovieId && x.UserEmail != userEmail).Skip(page*10).Take(10).ToList();
                dictionary.Add("Ratings", Rlist);
            }
            catch (Exception e) 
            {
                return null;
            }

            return dictionary;
        }
        public static async Task<Rating> getMovieSingleRatingAsync(int MovieId, string userEmail)
        {
            
            moviesProjectContext context = new moviesProjectContext();
            Rating rating= new Rating();
            //String query = "SELECT * FROM ratings WHERE movieId='" + MovieId + "' AND userEmail='" + userEmail + "'";
            rating = await context.Ratings.SingleOrDefaultAsync(x => x.UserEmail == userEmail && x.MovieId == MovieId );
            

            return rating;

        }
        public static async Task<bool> insertRatingAsync(int movieId, string userEmail, string commentContent, bool like)
        {
            
            bool flag = true;
            try
            {
                //String query = "REPLACE INTO ratings VALUES (0," + movieId + ",'" + userEmail+"','"+commentContent+"',"+like+")";
                
                moviesProjectContext context = new moviesProjectContext();
                if(await context.Ratings.AnyAsync(x => x.UserEmail == userEmail && x.MovieId == movieId))
                {
                    var item =await context.Ratings.SingleAsync(x => x.UserEmail == userEmail && x.MovieId == movieId);
                    item.Like = like;
                    item.CommentContent= commentContent; 
                }
                else
                {
                    await context.Ratings.AddAsync(new Rating()
                    {
                        UserEmail = userEmail,
                        MovieId = movieId,
                        CommentContent = commentContent,
                        Like = like
                    });
                }

                await context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                flag = false;
            }
            return flag;
        }
        public static async Task<bool> deleteRatingAsync(int movieId, string userEmail)
        {
            moviesProjectContext context = new moviesProjectContext();
            bool flag = true;
            try
            {
                
                //String query = "DELETE  FROM RATINGS WHERE movieId = '" + movieId + "' AND userEmail = '"+userEmail+"'";

                var itemToRemove =await context.Ratings.SingleOrDefaultAsync(x => x.MovieId == movieId && x.UserEmail == userEmail ); //returns a single item.

                if (itemToRemove != null) {
                    context.Ratings.Remove(itemToRemove);
                    await context.SaveChangesAsync();
                }

            }
            catch (Exception e)
            {
                flag = false;
            }

            return flag;
        }
        public static async Task<Dictionary<string, decimal>> getMovieAverageAsync(int MovieId)
        {
            
            decimal like = 0, dislike = 0, percentage = 0;
            moviesProjectContext context = new moviesProjectContext();
            Dictionary<string, decimal> dictionary = new Dictionary<string, decimal>();
            try
            {

                //String query = "Select sum(case when `like` = 1 then 1 else 0 end) AS Truecount,sum(case when `like` = 0 then 1 else 0 end) AS Falsecount FROM ratings WHERE movieId=" + MovieId + "";
                like = context.Ratings.AsQueryable().Where(x => x.MovieId == MovieId && x.Like == true ).Count();
                dislike = context.Ratings.AsQueryable().Where(x => x.MovieId == MovieId && x.Like == false ).Count();
            }
            catch (Exception e)
            {
                percentage = -1;
            }

            if (like > 0 || dislike > 0)
                percentage = (like / (like + dislike)) * 100;

            dictionary.Add("likes", like);
            dictionary.Add("dislikes", dislike);
            dictionary.Add("percentage", percentage);

            return dictionary;
        }

    }
}
