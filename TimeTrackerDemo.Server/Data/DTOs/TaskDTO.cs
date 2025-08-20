namespace TimeTrackerDemo.Server.Data.DTOs;

public class TaskDTO
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
}
