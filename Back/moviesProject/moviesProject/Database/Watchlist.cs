using System;
using System.Collections.Generic;

#nullable disable

namespace moviesProject.Database
{
    public partial class Watchlist
    {
        public int WatchlistId { get; set; }
        public string UserEmail { get; set; }
        public int MovieId { get; set; }
    }
}
