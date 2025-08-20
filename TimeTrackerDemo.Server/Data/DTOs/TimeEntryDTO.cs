namespace TimeTrackerDemo.Server.Data.DTOs;

public class TimeEntryDTO
{
    public Guid Id { get; set; }

    public DateOnly Date { get; set; }
    public int MinutesWorked { get; set; }

    public required PersonDTO Person { get; set; }
    public required TaskDTO Task { get; set; }
}
