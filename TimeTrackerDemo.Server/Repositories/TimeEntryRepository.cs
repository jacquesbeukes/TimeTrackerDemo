using Microsoft.EntityFrameworkCore;
using TimeTrackerDemo.Server.Data;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Data.DTOs.Mappers;

namespace TimeTrackerDemo.Server.Repositories;

public class TimeEntryRepository : ITimeEntryRepository, IDisposable
{
    private readonly TimeTrackingContext context;

    public TimeEntryRepository(TimeTrackingContext context)
    {
        this.context = context;
    }

    public async Task<IEnumerable<TimeEntryDTO>> GetEntries()
    {
        var timeEntries = await context.TimeEntries
                .Include(t => t.Person)
                .Include(t => t.Task)
                .ToListAsync();

        return timeEntries.ToDto();
    }

    public async Task<TimeEntryDTO> GetEntry(Guid id)
    {
        var timeEntry = await context.TimeEntries
                .Include(t => t.Person)
                .Include(t => t.Task)
                .FirstOrDefaultAsync(t => t.Id == id) ?? throw new NotFoundException($"No TimeEntry found with id {id}");
        
        return timeEntry.ToDto();
    }

    public async Task<Guid> CreateEntry(CreateTimeEntryDTO timeEntryDto)
    {
        var timeEntry = timeEntryDto.ToModel();
        timeEntry.Id = Guid.NewGuid();

        context.TimeEntries.Add(timeEntry);
        await context.SaveChangesAsync();
        
        return timeEntry.Id;
    }

    public async Task UpdateEntry(UpdateTimeEntryDTO timeEntryDto)
    {
        var timeEntry = timeEntryDto.ToModel();
        context.Entry(timeEntry).State = EntityState.Modified;

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await TimeEntryExists(timeEntry.Id)))
            {
                throw new NotFoundException($"No TimeEntry found with id {timeEntry.Id}");
            }
            else
            {
                throw;
            }
        }
    }

    public async Task DeleteEntry(Guid id)
    {
        var timeEntry = await context.TimeEntries.FindAsync(id);
        if (timeEntry == null)
        {
            throw new NotFoundException($"No TimeEntry found with id {timeEntry.Id}");
        }

        context.TimeEntries.Remove(timeEntry);
        await context.SaveChangesAsync();
    }

    private async Task<bool> TimeEntryExists(Guid id)
    {
        return await context.TimeEntries.AnyAsync(e => e.Id == id);
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
