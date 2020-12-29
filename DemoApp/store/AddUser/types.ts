export enum USER {
    ADD_USER = "ADD_USER",
    DELETE_USER = "DELETE_USER",
    UPDATE_USER="UPDATE_USER"
}

export interface UserState {
    users:any[];
    RequestUserData:RequestUserData;
}

export interface RequestUserData {
    Name: any;
    ImageURL: any;
    Mobile: any;
}
export interface AddUserAction {
    type: USER.ADD_USER,
    payload: RequestUserData
}

export interface DeleteUserAction{
    type:USER.DELETE_USER,
    payload:any
}

export interface RequestUpdateUserData {
    Name: any;
    ImageURL: any;
    Mobile: any;
    Index:any;
}
export interface UpdateUserAction{
    type:USER.UPDATE_USER,
    payload:RequestUpdateUserData
}



