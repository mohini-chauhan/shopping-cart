import { useState } from "react";
import * as yup from "yup";
import { userSchema } from "../pages/validations/Uservalidation";

const Login = () => {

    const createUser=async(event)=>{
        event.preventDefault()
        let formData={
            name:event.target[0].value,
            email:event.target[1].value,
            password:event.target[2].value,


        };
        const isValid = await userSchema.isValid(formData);
        console.log(isValid);

    };
    
    const [errors,setError]=useState({});
        return (
            <div className="container mx-auto flex  w-full items-center justify-center min-h-screen m-0">
                
                <div className="app-wrapper bg-yellow-600 w-80 max-h-full box-border rounded-md ">
                    <div>
                        <h2 className="title font-bold text-2xl text-center m-8">Log In</h2>
                    </div>
                    <form className="form-wrapper " onSubmit={createUser}>
                        <div className="name m-1 text-center text-base ">
                            <input className="input w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="Name..." />
                        </div>
                        <div className="email m-1 text-center text-base ">
                            <input className="input w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="email" placeholder="email@email.com" />                        </div>
                        <div className="Password m-1.5 text-center text-base">
                            <input className="input w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="password" placeholder="password123" />
                        </div>
                        <div className="flex items-center w-full justify-center">
                            <button className=" font-bold  py-2 px-4 my-4 leading-none transition-colors duration-150 bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-800 ">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        )
}

export default Login
