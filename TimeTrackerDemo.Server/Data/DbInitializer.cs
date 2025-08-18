using TimeTrackerDemo.Server.Models;

namespace TimeTrackerDemo.Server.Data;

public static class DbInitializer
{
    public static void Initialize(TimeTrackingContext context)
    {
        context.Database.EnsureCreated();

        // Look for any people.
        if (context.People.Any())
        {
            return;   // DB has been seeded
        }

        var people = new Person[]
        {
            new Person{FullName="Anton"},
            new Person{FullName="Aura"},
        };

        foreach (var person in people)
        {
            context.People.Add(person);
        }
        context.SaveChanges();

        var tasks = new TrackedTask[]
        {
            new TrackedTask{Name="Programming,"},
            new TrackedTask{Name="Testing"},
        };

        foreach (var task in tasks)
        {
            context.Tasks.Add(task);
        }
        context.SaveChanges();
    }
}
