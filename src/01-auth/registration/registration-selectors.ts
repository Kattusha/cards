import {createSelector} from "reselect";
import {AppStateType} from "../../main/bll/store";

const getMe = (state: AppStateType) =>{
    return state.registration.isAuth;
}
//
// export const getAllUsers = createSelector(getArrayUsers,
//     (users) => {
//         return users.filter(u => true);
//     })
//
// export const getPageSize = (state) =>{
//     return state.usersPage.pageSize;
// }
//
// export const getTotalUsersCount = (state) =>{
//     return state.usersPage.totalUsersCount;
// }
//
// export const getCurrentPage = (state) =>{
//     return state.usersPage.currentPage;
// }
//
// export const getIsFetching = (state) =>{
//     return state.usersPage.isFetching;
// }