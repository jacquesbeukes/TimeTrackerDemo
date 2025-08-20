using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonController : ControllerBase
{
    private readonly IPersonRepository personRepository;

    public PersonController(
        IPersonRepository personRepository)
    {
        this.personRepository = personRepository;
    }

    // GET: api/People
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonDTO>>> GetPeople()
    {
        var response = await personRepository.GetPeople();
        return Ok(response);
    }

}
