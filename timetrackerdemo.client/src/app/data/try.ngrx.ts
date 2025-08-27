import { createAction, props, emptyProps } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CreateTimeEntry, GUID, Person, TimeEntry, TrackedTask, UpdateTimeEntry } from '../models/models';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TimeTrackerService } from '../services/TimeTrackerService';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { EditEntryComponent } from '../components/TimeEntryModal/EditEntry';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEntryComponent } from '../components/TimeEntryModal/CreateEntry';

export const apiActions = {
  loadInitialData: createAction('[TimeEntry API] Load Initial Data', emptyProps),

  loadPeople: createAction('[TimeEntry API] Load People', emptyProps),
  loadPeopleSuccess: createAction('[TimeEntry API] Load People Success',
    props<{ people: Array<Person> }>()),

  loadTasks: createAction('[TimeEntry API] Load Tasks', emptyProps),
  loadTasksSuccess: createAction('[TimeEntry API] Load Tasks Success',
    props<{ tasks: Array<TrackedTask> }>()),

  loadAllEntries: createAction('[TimeEntry API] Load All Entries', emptyProps),
  loadAllEntriesSuccess: createAction('[TimeEntry API] Load All Entries Success',
    props<{ entries: Array<TimeEntry> }>()),

  deleteEntry: createAction('[TimeEntry API] Delete',
    props<{ entry: TimeEntry }>()),

  updateEntry: createAction('[TimeEntry API] Update',
    props<{ entry: UpdateTimeEntry }>()),

  createEntry: createAction('[TimeEntry API] Create',
    props<{ entry: CreateTimeEntry }>()),
  createEntrySuccess: createAction('[TimeEntry API] Create Success',
    props<{ entry: TimeEntry }>()),
};

export const actions = {
  updateEntry: createAction('[TimeEntry List] Edit entry',
    props<{ entryId: GUID }>()),
  createEntry: createAction('[TimeEntry List] Create entry', emptyProps),
};

export const initialTimeEntryState: Array<TimeEntry> = [];

export const timeEntryReducer = createReducer(
  initialTimeEntryState,
  on(apiActions.loadAllEntriesSuccess, (_state, { entries }) => entries),
  on(apiActions.createEntrySuccess, (_state, { entry }) => {
    if (_state.indexOf(entry) > -1) return _state;
    return [..._state, entry];
  }),
);

export interface ReadonlyState {
  people: Array<Person>;
  tasks: Array<TrackedTask>;
};

export const initialReadonlyState: ReadonlyState = {
  people: [],
  tasks: []
};

export const readonlyReducer = createReducer(
  initialReadonlyState,
  on(apiActions.loadPeopleSuccess, (_state, { people }) => {
    return { ..._state, people: people };
  }),
  on(apiActions.loadTasksSuccess, (_state, { tasks }) => {
    return { ..._state, tasks: tasks };
  }),
);

export interface AppState {
  entryToEdit: GUID;
};

export const initialState: AppState = {
  entryToEdit: ''
};

export const appReducer = createReducer(
  initialState,
  on(actions.updateEntry, (_state, { entryId }) => {
    return { ..._state, entryToEdit: entryId };
  }),
);

export const selectTimeEntries = createFeatureSelector<Array<TimeEntry>>('entries');
export const selectReadonlyData = createFeatureSelector<ReadonlyState>('readonly');
export const selectAppState = createFeatureSelector<AppState>('app');

export const selectPeople = createSelector(
  selectReadonlyData,
  (readonly) => {
    return readonly.people;
  }
);

export const selectTasks = createSelector(
  selectReadonlyData,
  (readonly) => {
    return readonly.tasks;
  }
);

export const selectEntryToEditId = createSelector(
  selectAppState,
  (app) => {
    return app.entryToEdit;
  }
)

export const selectEntryToEdit = createSelector(
    selectEntryToEditId,
    selectTimeEntries,
    (entryId, entries) => entries.find(entry => entry.id === entryId)
  );

@Injectable()
export class TimeEntryEffects {
  private actions$ = inject(Actions);
  private timeTrackerService = inject(TimeTrackerService);
  private modalService = inject(NgbModal);

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.loadTasks.type, apiActions.loadInitialData.type),
      exhaustMap(() => this.timeTrackerService.getTasks()
        .pipe(
          map(tasks => apiActions.loadTasksSuccess({ tasks })),
          catchError(() => EMPTY)
        ))
    );
  });

  loadPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.loadPeople.type, apiActions.loadInitialData.type),
      exhaustMap(() => this.timeTrackerService.getPeople()
        .pipe(
          map(people => apiActions.loadPeopleSuccess({ people })),
          catchError(() => EMPTY)
        ))
    );
  });

  loadAllTimeEntries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.loadAllEntries.type, apiActions.loadInitialData.type),
      exhaustMap(() => this.timeTrackerService.getTimeEntries()
        .pipe(
          map(entries => apiActions.loadAllEntriesSuccess({ entries })),
          catchError(() => EMPTY)
        ))
    );
  });

  deleteTimeEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.deleteEntry.type),
      exhaustMap((action) =>
        this.timeTrackerService.deleteTimeEntry(action.entry).pipe(
          map(() => apiActions.loadAllEntries()),
          catchError(() => EMPTY)
        ))
    );
  });

  updateTimeEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.updateEntry.type),
      exhaustMap((action) =>
        this.timeTrackerService.updateTimeEntry(action.entry).pipe(
          map(() => apiActions.loadAllEntries()),
          catchError(() => EMPTY)
        ))
    );
  });

  createTimeEntry$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(apiActions.createEntry.type),
      exhaustMap((action) =>
        this.timeTrackerService.postTimeEntry(action.entry).pipe(
          map((entry) => apiActions.createEntrySuccess({ entry })),
          catchError(() => EMPTY)
        ))
    );
  });

  openEditModal$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.updateEntry.type),
      tap(() => this.modalService.open(EditEntryComponent))
    ),
    { dispatch: false });

  openCreateModal$ = createEffect(
    () => this.actions$.pipe(
      ofType(actions.createEntry.type),
      tap(() => this.modalService.open(CreateEntryComponent))
    ),
    { dispatch: false });
}
