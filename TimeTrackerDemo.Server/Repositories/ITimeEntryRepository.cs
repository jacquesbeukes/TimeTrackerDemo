using TimeTrackerDemo.Server.Data.DTOs;

namespace TimeTrackerDemo.Server.Repositories;

public interface ITimeEntryRepository : IDisposable
{
    Task<IEnumerable<TimeEntryDTO>> GetEntries();
    Task<TimeEntryDTO> GetEntry(Guid id);
    Task<Guid> CreateEntry(CreateTimeEntryDTO timeEntryDto);
    Task UpdateEntry(UpdateTimeEntryDTO timeEntryDto);
    Task DeleteEntry(Guid id);
    Task Save();
}
