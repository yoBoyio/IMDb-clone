using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace moviesProject.Classes
{
    public class MovieMethods
    {

        async public static Task<MovieFirebase> GetMovie(int id)
        {
            Firebase fb = new Firebase();
            FirestoreDb db = fb.db;

            Query docQ = db.Collection("movies").WhereEqualTo("id", id);
            QuerySnapshot snap = await docQ.GetSnapshotAsync();
            MovieFirebase movie = new MovieFirebase();
            foreach (DocumentSnapshot docsnap in snap)
                movie = docsnap.ConvertTo<MovieFirebase>();


            return movie;
        }
        async public static Task<List<MovieFirebase>> GetPopular(int page)
        {
            Firebase fb = new Firebase();
            FirestoreDb db = fb.db;

            Query docQ = db.Collection("movies").OrderByDescending("popularity").Limit(20).Offset(page*20);
            QuerySnapshot snap = await docQ.GetSnapshotAsync();
            MovieFirebase movie = new MovieFirebase();

            List<MovieFirebase> mlist = new List<MovieFirebase>();

            foreach (DocumentSnapshot docsnap in snap)
            {
                movie = docsnap.ConvertTo<MovieFirebase>();
                mlist.Add(movie);
            }

            return mlist;
        }

        async public static Task<List<MovieFirebase>> GetUpcoming(int page)
        {
            Firebase fb = new Firebase();
            FirestoreDb db = fb.db;

            Query docQ = db.Collection("movies").WhereGreaterThan("release_date","2021-01-01").OrderByDescending("release_date").Limit(20).Offset(page * 20);
            QuerySnapshot snap = await docQ.GetSnapshotAsync();
            MovieFirebase movie = new MovieFirebase();

            List<MovieFirebase> mlist = new List<MovieFirebase>();

            foreach (DocumentSnapshot docsnap in snap)
            {
                movie = docsnap.ConvertTo<MovieFirebase>();
                mlist.Add(movie);
            }

            return mlist;
        }

        async public static Task<List<MovieFirebase>> GetTopRated(int page)
        {
            Firebase fb = new Firebase();
            FirestoreDb db = fb.db;

            Query docQ = db.Collection("movies").OrderByDescending("vote_average").Limit(20).Offset(page * 20);
            QuerySnapshot snap = await docQ.GetSnapshotAsync();
            MovieFirebase movie = new MovieFirebase();

            List<MovieFirebase> mlist = new List<MovieFirebase>();

            foreach (DocumentSnapshot docsnap in snap)
            {
                movie = docsnap.ConvertTo<MovieFirebase>();
                mlist.Add(movie);
            }

            return mlist;
        }

        async public static Task<List<MovieFirebase>> GetNowPlaying(int page)
        {
            Firebase fb = new Firebase();
            FirestoreDb db = fb.db;

            Query docQ = db.Collection("movies").WhereGreaterThan("release_date", "2021-01-01").WhereLessThan("release_date", "2021-13-04").OrderByDescending("release_date").Limit(20).Offset(page * 20);
            QuerySnapshot snap = await docQ.GetSnapshotAsync();
            MovieFirebase movie = new MovieFirebase();

            List<MovieFirebase> mlist = new List<MovieFirebase>();

            foreach (DocumentSnapshot docsnap in snap)
            {
                movie = docsnap.ConvertTo<MovieFirebase>();
                mlist.Add(movie);
            }

            return mlist;
        }

        async public static Task<List<MovieFirebase>> SearchMovie(string query)
        {
            List<MovieFirebase> mlist = new List<MovieFirebase>();
            lucene search = new lucene();
            int[] ids = search.searchIndex(query);

            foreach (int id in ids)
            {
                mlist.Add(await GetMovie(id));
            }

            return mlist;
        }

    }
}
