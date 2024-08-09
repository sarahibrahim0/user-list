// user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure, loadUser, loadSingleUserSuccess, loadSingleUserFailure, setCurrentPage } from './user.actions';
import { User } from '../interfaces/user';

export interface UserState {
  users: User[];
  user: User ;
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
    error: string | null;
}

export const initialState: UserState = {
  users: [],
  user: null,
  currentPage: 1,
  totalPages: 0,
  totalPosts: 0,
  postsPerPage: 6,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state, { page}) => ({ ...state })),
  on(loadUsersSuccess, (state, { users, currentPage, postsPerPage, totalPages, totalPosts }) => ({
    ...state,
    users,
    currentPage,
    postsPerPage,
    totalPages,
    totalPosts
  })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),


  on(loadUser, (state) => ({ ...state , error:null  })),
  on(loadSingleUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadSingleUserFailure, (state, { error }) => ({ ...state, error })),
  on(setCurrentPage, (state, { currentPage }) => ({ ...state, currentPage })),

);

