using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace moviesProject.Database
{
    public partial class moviesProjectContext : DbContext
    {
        public moviesProjectContext()
        {
        }

        public moviesProjectContext(DbContextOptions<moviesProjectContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Watchlist> Watchlists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySQL("server=localhost;user id=root;password=;database=moviesProject");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rating>(entity =>
            {
                entity.ToTable("ratings");

                entity.HasIndex(e => e.RatingId, "ratingId")
                    .IsUnique();

                entity.HasIndex(e => new { e.UserEmail, e.MovieId }, "unique_index")
                    .IsUnique();

                entity.Property(e => e.RatingId)
                    .HasColumnType("int(11)")
                    .HasColumnName("ratingId");

                entity.Property(e => e.CommentContent)
                    .HasMaxLength(255)
                    .HasColumnName("commentContent")
                    .HasDefaultValueSql("'NULL'");

                entity.Property(e => e.Like)
                    .HasColumnName("like")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.MovieId)
                    .HasColumnType("int(11)")
                    .HasColumnName("movieId");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("userEmail");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.UserId, "userId")
                    .IsUnique();

                entity.Property(e => e.UserId)
                    .HasColumnType("int(11)")
                    .HasColumnName("userId");

                entity.Property(e => e.IsAdmin)
                    .HasColumnName("isAdmin")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("userEmail");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("userName");

                entity.Property(e => e.UserPassword)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("userPassword");
            });

            modelBuilder.Entity<Watchlist>(entity =>
            {
                entity.ToTable("watchlist");

                entity.HasIndex(e => e.WatchlistId, "WatchlistId")
                    .IsUnique();

                entity.Property(e => e.WatchlistId).HasColumnType("int(11)");

                entity.Property(e => e.MovieId)
                    .HasColumnType("int(11)")
                    .HasColumnName("movieId");

                entity.Property(e => e.UserEmail)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("userEmail");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
