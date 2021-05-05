using System;
using System.Collections.Generic;

#nullable disable

namespace moviesProject.Database
{
    public partial class Rating
    {
        public int RatingId { get; set; }
        public int MovieId { get; set; }
        public string UserEmail { get; set; }
        public string CommentContent { get; set; }
        public bool? Like { get; set; }
    }
}
