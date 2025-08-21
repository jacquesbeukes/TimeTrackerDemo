using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Data.Models;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TimeEntryController : ControllerBase
{
    private readonly ITimeEntryRepository timeEntryRepository;

    public TimeEntryController(ITimeEntryRepository timeEntryRepository)
    {
        this.timeEntryRepository = timeEntryRepository;
    }

    // GET: api/TimeEntry
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TimeEntryDTO>>> GetTimeEntries()
    {
        var response = await timeEntryRepository.GetEntries();
        return Ok(response);
    }

    // GET: api/TimeEntry/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TimeEntryDTO>> GetTimeEntry(Guid id)
    {
        try
        {
            var response = await timeEntryRepository.GetEntry(id);
            return Ok(response);
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    // PUT: api/TimeEntry/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTimeEntry(Guid id, UpdateTimeEntryDTO timeEntryDto)
    {
        if (id != timeEntryDto.Id)
        {
            return BadRequest();
        }

        try {
            await timeEntryRepository.UpdateEntry(timeEntryDto);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }

    // POST: api/TimeEntry
    [HttpPost]
    public async Task<ActionResult<TimeEntry>> PostTimeEntry(CreateTimeEntryDTO timeEntryDto)
    {
        try
        {
            var newEntryId = await timeEntryRepository.CreateEntry(timeEntryDto);
            var createdTimeEntry = await timeEntryRepository.GetEntry(newEntryId);
            return CreatedAtAction("GetTimeEntry", new { id = newEntryId }, createdTimeEntry);
        }
        catch (NotFoundException)
        {
            //todo: implement custom error
            return StatusCode(500);
        }
    }

    // DELETE: api/TimeEntry/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTimeEntry(Guid id)
    {
        try
        {
            await timeEntryRepository.DeleteEntry(id);
            return NoContent();
        }
        catch (NotFoundException)
        {
            return NotFound();
        }
    }
}
