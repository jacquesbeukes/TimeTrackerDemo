namespace TimeTrackerDemo.Server.Data.Models;

public class TrackedTask
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }

    public ICollection<TimeEntry>? TimeEntries { get; set; }
}
