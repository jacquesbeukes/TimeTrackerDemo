
export type GUID = string;

export interface Person {
  id: GUID;
  fullName: string;
}

export interface TrackedTask {
  id: GUID;
  name: string;
  description: string;
}

export interface TimeEntry {
  id: GUID;
  date: Date;
  minutesWorked: int;
  person: Person;
  task: TrackedTask;
}
