using Microsoft.AspNetCore.Mvc;
using TimeTrackerDemo.Server.Models;
using TimeTrackerDemo.Server.Repositories;

namespace TimeTrackerDemo.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly ILogger<TaskController> _logger;
    private readonly ITaskRepository taskRepository;

    public TaskController(
        ITaskRepository taskRepository, 
        ILogger<TaskController> logger)
    {
        _logger = logger;
        this.taskRepository = taskRepository;
    }

    [HttpGet(Name = "GetTasks")]
    public IEnumerable<TrackedTask> Get()
    {
        return taskRepository.GetTasks();
    }

}
