using Microsoft.EntityFrameworkCore;
using TimeTrackerDemo.Server.Data.Models;

namespace TimeTrackerDemo.Server.Data;

public class TimeTrackingContext : DbContext
{
    public TimeTrackingContext(DbContextOptions<TimeTrackingContext> options) : base(options)
    {
    }

    public DbSet<Person> People { get; set; }
    public DbSet<TrackedTask> Tasks { get; set; }
    public DbSet<TimeEntry> TimeEntries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>().ToTable("Person");
        modelBuilder.Entity<TrackedTask>().ToTable("TrackedTask");
        modelBuilder.Entity<TimeEntry>().ToTable("TimeEntry");
    }
}
