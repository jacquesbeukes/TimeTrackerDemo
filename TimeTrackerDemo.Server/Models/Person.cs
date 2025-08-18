namespace TimeTrackerDemo.Server.Models;

public class Person
{
    public Guid Id { get; set; }
    public string FullName { get; set; }

    public ICollection<TimeEntry> TimeEntries { get; set; }
}
