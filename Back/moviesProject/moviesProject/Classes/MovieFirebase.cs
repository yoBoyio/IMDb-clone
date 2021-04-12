using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace moviesProject.Classes
{
    [FirestoreData]
    public class MovieFirebase
    {
        [FirestoreProperty]
        public int id { get; set; }

        [FirestoreProperty]
        public int[] genre_ids { get; set; }

        [FirestoreProperty]
        public string original_language { get; set; }

        [FirestoreProperty]
        public string original_title { get; set; }

        [FirestoreProperty]
        public string overview { get; set; }

        [FirestoreProperty]
        public int popularity { get; set; }

        [FirestoreProperty]
        public string poster_path { get; set; }

        [FirestoreProperty]
        public string release_date { get; set; }

        [FirestoreProperty]
        public string title { get; set; }

        [FirestoreProperty]
        public double vote_average { get; set; }

        [FirestoreProperty]
        public int vote_count { get; set; }


    }
}
