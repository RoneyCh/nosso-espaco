import { createContext, ReactNode, useState } from "react";
import Router from 'next/router'

type User = {
    usuario: string;
}

type SignInCredentials = {
    usuario: string,
    senha: string,
}

type AuthContextData = {
    signIn(credentials:SignInCredentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
    logOut():Promise<void>
}

type AuthProviderPros = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProviderPros) {
    const [user,setUser] = useState<User>();
    const isAuthenticated = !!user; 
    const usuario1 = {
        usuario: process.env.NEXT_PUBLIC_USUARIO,
        senha: process.env.NEXT_PUBLIC_SENHA
    }

    async function signIn({usuario, senha}:SignInCredentials) {
       if(usuario1.usuario === usuario && usuario1.senha === senha) {
            setUser({usuario})
            Router.push('/home');
        } else {
            console.log('errou');
        }
    }

    async function logOut() {
        if(!user) Router.push('/');
     }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, user, logOut}}>{children}</AuthContext.Provider>
    )
}
