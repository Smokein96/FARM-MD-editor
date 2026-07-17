import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import {login} from "../api/auth_api.js"

export function LogIn() {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const notify = (message) => {
        toast(message)
    }

    async function handleCheck(e) {
        e.preventDefault();

        if (!userName || !password) {
            notify("Please fill in all fields");
            return;
        }

        try{
            const result = await login(userName, password)

            localStorage.setItem(
                "token", result.access_token
            );

            navigate("/notes")
            notify("Logged in succesfully")

        } catch (e) {
            navigate("error",{
                state:{
                    status_code: e.status_code,
                    error : e.message
                }
            })
            notify(e.message)
        }
    }   

    return (
        <div className="min-h-screen bg-teal-800 flex items-center justify-center font-mono">
            <div className="w-full max-w-md bg-teal-900 rounded-xl shadow-2xl p-8 text-amber-50">

                <h1 className="text-4xl font-bold text-center mb-2">
                    Md.X
                </h1>

                <p className="text-center text-gray-300 mb-8" >
                    Login
                </p>

                <form className="space-y-5 flex flex-col" onSubmit={handleCheck}>

                    <div>
                        <label className="block mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            className="w-full p-3 rounded bg-teal-800 border border-teal-700
                                       focus:outline-none focus:border-amber-400"
                            onChange={ (e) => {setUserName(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full p-3 rounded bg-teal-800 border border-teal-700
                                       focus:outline-none focus:border-amber-400"
                            onChange={ (e) => {setPassword(e.target.value) }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-700 hover:bg-teal-600
                                   rounded p-3 font-bold transition-all
                                   hover:shadow-lg hover:shadow-teal-500/40"
                    >
                        Log into Vault
                    </button>
                    <button
                        type="submit"
                        className="w-fit self-center bg-teal-600 hover:bg-teal-400
                                   rounded p-3 font-bold transition-all
                                   hover:shadow-lg hover:shadow-teal-500/40"
                        onClick={() => {navigate("/setup")}}
                    >
                        Sign In
                    </button>

                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        theme="dark"
                    />

                </form>

            </div>
        </div>
    );
}