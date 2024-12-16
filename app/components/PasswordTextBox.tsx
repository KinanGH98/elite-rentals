﻿'use client'
import {useState} from "react";
import {EyeClosedIcon, EyeIcon} from "@/app/icons";

interface TextBoxProps
{
    id: string,
    label: string,
    placeholder: string,
    defaultValue?: string
}

/**
 * A password text input field with show/hide password button.
 */
export default function PasswordTextBox({id, label, placeholder, defaultValue = ''}: TextBoxProps)
{
    const [inputType, setInputType] = useState('password');

    return (
        <div className='flex flex-col gap-1 relative'>
            <label htmlFor={id}>{label}</label>
            <input
                required
                className='input input-bordered'
                defaultValue={defaultValue}
                type={inputType}
                autoComplete='on'
                id={id}
                name={id}
                placeholder={placeholder}/>

            <button onClick={() => setInputType(currentType => currentType === 'password' ? 'text' : 'password')}
                    type='button' className='absolute right-4 top-[40px]'>
                {inputType === 'password' ? <EyeClosedIcon/> : <EyeIcon/>}
            </button>
        </div>
    );
}