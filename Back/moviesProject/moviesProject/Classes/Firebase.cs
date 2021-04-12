using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;


namespace moviesProject.Classes
{
    public class Firebase
    {
        public FirestoreDb db;
        //init firebase
        public Firebase()
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"cloudfire.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);

             db = FirestoreDb.Create("imdb-clone-project");

        }

        public  static void getDoc()
        {
           
        }
         public static async void GetAllDocuments(string collectionName)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + @"cloudfire.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);

            FirestoreDb db = FirestoreDb.Create("imdb-clone-project");

            Query movie = db.Collection(collectionName);
            QuerySnapshot snap = await movie.GetSnapshotAsync();

                foreach (DocumentSnapshot documentSnapshot in snap.Documents)
                {
                    if (documentSnapshot.Exists)
                    {
                        Dictionary<string, object> documentDictionary = documentSnapshot.ToDictionary();
                        foreach(var item in documentDictionary)
                        {
                        Console.WriteLine(item.Key,item.Value);

                        }

                    }
                }
            
        }
    }
}
