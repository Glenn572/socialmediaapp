import { createContext,useReducer } from "react"
import AuthReducer from "./AuthReducer"

// {  
//     _id:"639347f7fd0f3c285aa84d4d",
//     username:"Messi",
//     email:"messi@gmail.com",
//     password:"$2b$05$fH.m8MnZXn7YXb6be7zWK.P3lR9a9S84GLdeTF9RGgAKErtBvso3K",
//     profilePicture:"messipro.jpg",
//     coverPicture:"messi.jpg",
//     followers:[],
//     following:[],
//     isAdmin:false   
// }

const INITIAL_STATE={
user:'',
isFetching:false,
error:false
}

export const AuthContext=createContext(INITIAL_STATE)

export const  AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(AuthReducer,INITIAL_STATE)
    return (
       <AuthContext.Provider 
       value={{user:state.user,
    isFetching:state.isFetching,
error:state.error,dispatch}
}>
    {children}
</AuthContext.Provider>
    )
}