using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Models;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TimeEntryController : ControllerBase
{
    private readonly ILogger<TimeEntryController> _logger;
    private readonly ITimeEntryRepository timeEntryRepository;

    public TimeEntryController(
        ITimeEntryRepository timeEntryRepository, 
        ILogger<TimeEntryController> logger)
    {
        _logger = logger;
        this.timeEntryRepository = timeEntryRepository;
    }

    [HttpGet(Name = "GetTimeEntries")]
    public IEnumerable<TimeEntry> Get()
    {
        return timeEntryRepository.GetEntries();
    }

}
