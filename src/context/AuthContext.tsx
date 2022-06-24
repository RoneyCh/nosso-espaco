import { createContext, ReactNode, useEffect, useState } from "react";
import Router from 'next/router';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './../firebase'

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
    logOut():Promise<void>
}

type AuthProviderPros = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProviderPros) {
    const [user,setUser] = useState<User>();

    useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => { 
        if (currentUser) {
            setUser({usuario: currentUser.email})
        } else {
            setUser(null)
        }

    })
}, [])
    async function signIn({usuario, senha}:SignInCredentials) {
        try {
            const loginData = await signInWithEmailAndPassword(auth, usuario, senha);
            console.log(loginData); 
            Router.push('/home');
        } catch(e) {
            console.log(e);
        }

    }

    async function logOut() {
        await signOut(auth);
        Router.push('/');
     }

    return (
        <AuthContext.Provider value={{signIn, user, logOut}}>{children}</AuthContext.Provider>
    )
}
