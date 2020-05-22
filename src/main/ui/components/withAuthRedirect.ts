import {Redirect} from "react-router-dom";
import {Component, ReactComponentElement} from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/store";

// export const withAuthRedirect = (Component: any) => {
//
//     const RedirectComponent = (props: any) => {
//
//         const {isAuthorized} = useSelector((store: AppStateType) => store.login);
//         if (!isAuthorized)
//             return <Redirect />
//
//         return <Component {...props} />
//
//     }
//     return RedirectComponent;
// };
