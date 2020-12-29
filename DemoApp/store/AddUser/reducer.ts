import { USER, UserState } from './types';
import _, { remove } from 'lodash';
import { Alert } from 'react-native';

export const initialState: UserState = {
    RequestUserData: {
        Name: '',
        ImageURL: '',
        Mobile: '',
    },
    users: []
}

    
export const userReucer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER.ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        Name: action.payload.Name,
                        ImageURL: '',
                        Mobile: action.payload.Mobile,
                    }
                ]
            }
        case USER.DELETE_USER:
            if (state.users) {
                console.log("Actionpayload", action.payload)
                return {
                    ...state,
                    users: state.users.filter((value, index) => {
                        console.log("data", value)
                        return value.Mobile !== action.payload;
                    }),
                };
            }

        case USER.UPDATE_USER:
            var obj =  {
                Name: action.payload.Name,
                ImageURL: '',
                Mobile: action.payload.Mobile,
            }
            return Object.assign({},state.users,{
               users:state.users.map(user =>{
                  return user.Mobile === action.payload.Mobile ? ( obj) :user
               }) 
            })
        default:
            return state
    }
}

export default userReucer;