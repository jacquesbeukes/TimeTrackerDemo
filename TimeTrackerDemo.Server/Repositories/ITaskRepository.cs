using TimeTrackerDemo.Server.Data.DTOs;

namespace TimeTrackerDemo.Server.Repositories;

public interface ITaskRepository : IDisposable
{
    Task<IEnumerable<TaskDTO>> GetTasks();
    Task Save();
}
