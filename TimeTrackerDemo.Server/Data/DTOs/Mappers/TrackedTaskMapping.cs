using TimeTrackerDemo.Server.Data.Models;

namespace TimeTrackerDemo.Server.Data.DTOs.Mappers;

public static class TrackedTaskMapping
{
    public static IEnumerable<TaskDTO> ToDto(this IEnumerable<TrackedTask> task)
    {
        return task.Select(e => e.ToDto());
    }

    public static TaskDTO ToDto(this TrackedTask task)
    {
        return new TaskDTO
        {
            Id = task.Id,
            Name = task.Name,
            Description = task.Description
        };
    }
}