namespace TimeTrackerDemo.Server.Data.DTOs;

public class CreateTimeEntryDTO
{
    public Guid PersonId { get; set; }
    public Guid TaskId { get; set; }

    public DateOnly Date { get; set; }
    public int MinutesWorked { get; set; }
}
