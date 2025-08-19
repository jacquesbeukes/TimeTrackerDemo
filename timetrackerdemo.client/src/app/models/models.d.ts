
export type GUID = string;

export interface Person {
  id: GUID;
  fullName: string;
  timeEntries: TimeEntry[]
}

export interface TrackedTask {
  id: GUID;
  name: string;
  description: string;
  timeEntries: TimeEntry[]
}

export interface TimeEntry {
  id: GUID;
  personId: GUID;
  taskId: GUID;
  date: Date
  time: int
}
