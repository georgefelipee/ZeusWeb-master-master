import { set } from 'date-fns';
import React, { createContext, useContext, useEffect, useState } from 'react'
import UserServices from '../../services/UserServices/UserService';
import { getUserLocalStorage } from './utils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const UserService = new UserServices()

    const [user, setUser] = useState()

    useEffect(()=> {
        const user = getUserLocalStorage()
        if(user){
            setUser(user)
        }
    }, [])


    async function authenticate(email, password) {
        const response = await UserService.login(email, password)

        
        const payload = {
            token: response.token,
            nome: response.nome,
            email: response.email
        }

        setUser(payload)

    }

    function logout() {

        setUser(null)

    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export function UseAuthContext(){
    return useContext(AuthContext)
}