using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Models;

namespace TimeTrackerDemo.Server.Repositories;

public interface IPersonRepository : IDisposable
{
    IEnumerable<Person> GetPeople();
    void Save();
}

public class PersonRepository : IPersonRepository, IDisposable
{
    private TimeTrackingContext context;

    public PersonRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public IEnumerable<Person> GetPeople()
    {
        return context.People;
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
