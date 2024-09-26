"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";

export default function Login() {

    const [ credentials, setCredentials ] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [event.target.name] : event.target.value,
        });
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        (async function fetchLogin() {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/login`, credentials, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    withCredentials: true
                });
                console.log(res.data)

            } catch(exc: unknown) {
    
                if (axios.isAxiosError(exc)){
    
                    const axiosError = exc as AxiosError;
    
                    if (axiosError.response) {
                        console.error('Error en la respuesta:', axiosError.response.data);
                        console.error('Código de estado:', axiosError.response.status);
                        console.error('Datos enviados:', axiosError.response.config.data);
                    } else if (axiosError.request) {
                        console.error('No se recibió respuesta:', axiosError.request);
                    } else {
                        console.error('Error al configurar la solicitud:', axiosError.message);
                    }
                } else {
                    console.error('Error desconocido:', exc);
                }
            }
        })()
    }

    return (
        <form onSubmit={handleSubmit} method="post">
            <input type="text" name="username" placeholder="username" onChange={handleChange}/>
            <input type="password" name="password" placeholder="password" onChange={handleChange}/>
            <input type="submit" value="Login" />
        </form>    
    )
}