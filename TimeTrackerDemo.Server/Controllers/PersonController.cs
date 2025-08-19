using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Models;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class PersonController : ControllerBase
{
    private readonly ILogger<PersonController> _logger;
    private readonly IPersonRepository personRepository;

    public PersonController(
        IPersonRepository personRepository, 
        ILogger<PersonController> logger)
    {
        _logger = logger;
        this.personRepository = personRepository;
    }

    [HttpGet(Name = "GetPeople")]
    public IEnumerable<Person> Get()
    {
        return personRepository.GetPeople();
    }

}
