import { createAction , props } from "@ngrx/store";
import { User } from "../interfaces/user";


export const loadUsers = createAction('[User] Load Users', props<{ page: number, postsPerPage: number }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[], currentPage: number, totalPages: number, totalPosts: number  , postsPerPage: number}>());

export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());


export const loadUser = createAction('[User] Load User' , props<{ userId : string }>() );
export const loadSingleUserSuccess = createAction('[User] Load User Success', props<{ user : User }>());
export const loadSingleUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());



export const setCurrentPage = createAction('[User] Set Current Page', props<{ currentPage: number }>());

