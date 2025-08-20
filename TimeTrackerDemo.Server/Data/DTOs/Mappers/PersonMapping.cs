using TimeTrackerDemo.Server.Data.Models;

namespace TimeTrackerDemo.Server.Data.DTOs.Mappers;

public static class PersonMapping
{
    public static IEnumerable<PersonDTO> ToDto(this IEnumerable<Person> people)
    {
        return people.Select(e => e.ToDto());
    }

    public static PersonDTO ToDto(this Person person)
    {
        return new PersonDTO
        {
            Id = person.Id,
            FullName = person.FullName
        };
    }
}