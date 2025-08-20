namespace TimeTrackerDemo.Server.Data.Models;

public class TimeEntry
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public Guid TaskId { get; set; }

    public DateOnly Date {  get; set; }
    public int MinutesWorked { get; set; }

    public Person Person { get; set; }
    public TrackedTask Task { get; set; }
}
