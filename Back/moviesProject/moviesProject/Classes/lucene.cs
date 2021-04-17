using Lucene.Net.Analysis;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers;
using Lucene.Net.Search;
using Lucene.Net.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Lucene.Net.Documents.Field;
using System.Configuration;
using System.IO;

namespace moviesProject.Classes
{
    public class lucene
    {

        public int[] searchIndex(string text)
        {
            var directory = new DirectoryInfo("MovieTitlesIndex");
            var mMapDirectory = new MMapDirectory(directory);
            var Index = mMapDirectory;
            using (var reader = IndexReader.Open(Index, true))
            using (var searcher = new IndexSearcher(reader))
            {
                using (Analyzer analyzer = new StandardAnalyzer(Lucene.Net.Util.Version.LUCENE_30))
                {
                    var queryParser = new QueryParser(Lucene.Net.Util.Version.LUCENE_30, "Title", analyzer);
                    var query = queryParser.Parse(text);
                    var collector = TopScoreDocCollector.Create(20, true);
                    searcher.Search(query, collector);
                    var matches = collector.TopDocs().ScoreDocs;

                    var matchedList = new int[matches.Count()];
                    int i = 0;

                    foreach (var item in matches)
                    {
                        var id = item.Doc;
                        var doc = searcher.Doc(id);
                        int titleid;
                        Int32.TryParse(doc.GetField("id").StringValue, out titleid);
                        matchedList[i] = titleid;
                        i++;
                    }

                    return matchedList;


                }
            }
        }


        //TI EKANA GIA NA FTIAKSW TON INDEX PERNONTAS OTI MOVIE UPARXEI KAI VAZONTAS THN SE LIST KAI APOTHIKEVONTAS STON INDEX MAS MOVIES TOU LIST 

        /*public MMapDirectory createIndex(List<MovieFirebase> ml)
        {
            var directory = new DirectoryInfo("MovieTitlesIndex");
            var mMapDirectory = new MMapDirectory(directory);
            try
            {

                using (Analyzer analyzer = new StandardAnalyzer(Lucene.Net.Util.Version.LUCENE_30))
                using (var writer = new IndexWriter(mMapDirectory, analyzer, new IndexWriter.MaxFieldLength(1000)))
                { // the writer and analyzer will popuplate the directory with documents

                    foreach (MovieFirebase item in ml)
                    {
                        var document = new Document();

                        document.Add(new Lucene.Net.Documents.Field("id", item.id.ToString(), Lucene.Net.Documents.Field.Store.YES, Lucene.Net.Documents.Field.Index.ANALYZED));
                        document.Add(new Lucene.Net.Documents.Field("Title", item.title, Lucene.Net.Documents.Field.Store.YES, Lucene.Net.Documents.Field.Index.ANALYZED));

                        writer.AddDocument(document);
                    }


                    writer.Optimize();
                    writer.Flush(true, true, true);
                }
            }
            catch (Exception e) { }
            return mMapDirectory;
        }*/

    }
}
