namespace TimeTrackerDemo.Server.Data.DTOs;

public class PersonDTO
{
    public Guid Id { get; set; }
    public required string FullName { get; set; }
}
