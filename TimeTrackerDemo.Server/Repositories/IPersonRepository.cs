using TimeTrackerDemo.Server.Data.DTOs;

namespace TimeTrackerDemo.Server.Repositories;

public interface IPersonRepository : IDisposable
{
    Task<IEnumerable<PersonDTO>> GetPeople();
    Task Save();
}
