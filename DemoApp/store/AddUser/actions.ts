import axios from 'axios';
import { AddUserAction, USER, RequestUserData, DeleteUserAction, UpdateUserAction, RequestUpdateUserData } from './types';

export const addUser = (user: RequestUserData): AddUserAction => {
    return {
        type: USER.ADD_USER,
        payload: user
    }

}

export const deleteUser = (user: any): DeleteUserAction => {
    return {
        type: USER.DELETE_USER,
        payload: user
    }

}

export const upadteUser = (user:RequestUpdateUserData) : UpdateUserAction =>{
    return{
        type:USER.UPDATE_USER,
        payload:user
    }
}