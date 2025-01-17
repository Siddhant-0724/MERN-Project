import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserApi from "./api/UserApi";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {

        const [token,setToken] = useState(false)


        const refreshToken = async () => {
                const res = await axios.get('/user/refresh_token')
                setToken(res.data.accesstoken)
        }
    
        useEffect(()=>{
            const firstLogin = localStorage.getItem('firstLogin')
            if(firstLogin) refreshToken()
        },[])

        const state ={
            token:[token,setToken],
            ProductAPI:ProductAPI(),
            UserApi:UserApi(token)
        }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}