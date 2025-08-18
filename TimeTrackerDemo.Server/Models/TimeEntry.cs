namespace TimeTrackerDemo.Server.Models;

public class TimeEntry
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public Guid TaskId { get; set; }

    public DateOnly date {  get; set; }
    public TimeSpan time { get; set; }

    public Person Person { get; set; }
    public TrackedTask Task { get; set; }
}
