using TimeTrackerDemo.Server.Data.Models;

namespace TimeTrackerDemo.Server.Data.DTOs.Mappers;

public static class TimeEntryMapping
{
    public static IEnumerable<TimeEntryDTO> ToDto(this IEnumerable<TimeEntry> entries)
    {
        return entries.Select(e => e.ToDto());
    }

    public static TimeEntryDTO ToDto(this TimeEntry timeEntry)
    {
        return new TimeEntryDTO
        {
            Id = timeEntry.Id,
            Date = timeEntry.Date,
            MinutesWorked = timeEntry.MinutesWorked,
            Person = timeEntry.Person.ToDto(),
            Task = timeEntry.Task.ToDto()
        };
    }

    public static TimeEntry ToModel(this UpdateTimeEntryDTO dto)
    {
        return new TimeEntry
        {
            Id = dto.Id,
            PersonId = dto.PersonId,
            TaskId = dto.TaskId,
            Date = dto.Date,
            MinutesWorked = dto.MinutesWorked
        };
    }

    public static TimeEntry ToModel(this CreateTimeEntryDTO dto)
    {
        return new TimeEntry
        {
            PersonId = dto.PersonId,
            TaskId = dto.TaskId,
            Date = dto.Date,
            MinutesWorked = dto.MinutesWorked
        };
    }
}
