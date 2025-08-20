using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Data.DTOs;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly ITaskRepository taskRepository;

    public TaskController(
        ITaskRepository taskRepository)
    {
        this.taskRepository = taskRepository;
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDTO>>> GetTasks()
    {
        var response = await taskRepository.GetTasks();
        return Ok(response);
    }

}
