using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Models;

namespace TimeTrackerDemo.Server.Repositories;

public interface ITaskRepository : IDisposable
{
    IEnumerable<TrackedTask> GetTasks();
    void Save();
}

public class TaskRepository : ITaskRepository, IDisposable
{
    private TimeTrackingContext context;

    public TaskRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public IEnumerable<TrackedTask> GetTasks()
    {
        return context.Tasks;
    }

    public void Save()
    {
        context.SaveChanges();
    }

    private bool disposed = false;

    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                context.Dispose();
            }
        }
        disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
