using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Models;

namespace TimeTrackerDemo.Server.Repositories;

public interface ITimeEntryRepository : IDisposable
{
    IEnumerable<TimeEntry> GetEntries();
    void Save();
}

public class TimeEntryRepository : ITimeEntryRepository, IDisposable
{
    private TimeTrackingContext context;

    public TimeEntryRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public IEnumerable<TimeEntry> GetEntries()
    {
        return context.TimeEntries;
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
