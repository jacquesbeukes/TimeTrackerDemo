using Microsoft.EntityFrameworkCore;
using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Data.DTOs.Mappers;

namespace TimeTrackerDemo.Server.Repositories;

public class TaskRepository : ITaskRepository, IDisposable
{
    private TimeTrackingContext context;

    public TaskRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<TaskDTO>> GetTasks()
    {
        var tasks = await context.Tasks
            .ToListAsync();

        return tasks.ToDto();
    }

    public async Task Save()
    {
        await context.SaveChangesAsync();
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
