// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUser, loadSingleUserSuccess, loadSingleUserFailure } from './user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(action =>
        this.userService.getUsers(action.page).pipe(
          map(response => loadUsersSuccess({
            users: response.data,
            currentPage: response.page,
            postsPerPage: response.per_page,
            totalPages: response.total_pages,
            totalPosts: response.total
          })),catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(action =>
        this.userService.getUserById(action.userId).pipe(
          map(user => loadSingleUserSuccess({user : user.data})),
          catchError(error => of(loadSingleUserFailure({ error })))
        )
      )
    )
  );



}