namespace TimeTrackerDemo.Server.Data.DTOs;

public class UpdateTimeEntryDTO
{
    public Guid Id { get; set; }
    public Guid PersonId { get; set; }
    public Guid TaskId { get; set; }

    public DateOnly Date { get; set; }
    public int MinutesWorked { get; set; }
}
