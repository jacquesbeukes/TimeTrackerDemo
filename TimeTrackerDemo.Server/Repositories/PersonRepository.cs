using Microsoft.EntityFrameworkCore;
using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Data.DTOs.Mappers;

namespace TimeTrackerDemo.Server.Repositories;

public class PersonRepository : IPersonRepository, IDisposable
{
    private TimeTrackingContext context;

    public PersonRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<PersonDTO>> GetPeople()
    {
        var people = await context.People
            .ToListAsync();

        return people.ToDto();
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
