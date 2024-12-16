﻿'use client'
import React, {useEffect, useActionState} from "react";
import Turnstile, {useTurnstile} from 'react-turnstile'
import TextBox from "@/app/components/TextBox";
import Link from "next/link";
import {FormSubmitButton} from "@/app/components/FormSubmitButton";
import {useTheme} from "next-themes";
import {toast} from "react-toastify";
import LogoLink from "@/app/components/LogoLink";
import {loginAdmin, loginCustomer} from "@/app/auth/loginActions";
import {createClient} from "@/lib/supabase/client";
import ProviderButton from "@/app/components/ProviderButton";
import {AppleLogo, FacebookLogo, GoogleLogo} from "@/app/icons";
import PasswordTextBox from "@/app/components/PasswordTextBox";
import {LoginIcon} from "@/app/icons";

/**
 * Login form component.
 * @param isAdmin whether this login page is for admins or customers, redirection links will get set properly depending on this property.
 */
export function LoginPage({isAdmin}: { isAdmin: boolean })
{
    const turnstile = useTurnstile();
    const theme = useTheme();

    const [state, loginAction, isPending] =
        useActionState(isAdmin ? loginAdmin : loginCustomer, {
            data: {
                email: '',
                password: '',
            },
            error: ''
        })

    // Show an error toast if there's errors, also reset the captcha.
    useEffect(() =>
    {
        if (!state.error) return;
        toast.error(state.error)
        turnstile.reset();
    }, [state]);

    const handleOAuthSignIn = async () =>
    {
        const supabase = createClient();
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {redirectTo: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL + (isAdmin ? 'admin' : 'customer')},
        });

        if (error) toast.error(error.message);
    }

    return (
        <form action={loginAction}
              id="login-form"
              autoComplete='on'
              className="flex flex-col w-full py-8 px-2 sm:px-8 my-auto min-h-screen h-full gap-7 justify-center relative scale-95 z-[1]">

            <LogoLink className='mx-auto'/>

            <h1 className='text-2xl text-center'>Log in</h1>

            <div className='flex items-center justify-center gap-4'>
                <ProviderButton icon={<GoogleLogo/>} onClickHandler={handleOAuthSignIn}/>
                <ProviderButton icon={<FacebookLogo/>}
                                onClickHandler={() => toast('Facebook accounts will be supported soon.')}/>
                <ProviderButton icon={<AppleLogo/>}
                                onClickHandler={() => toast('Apple accounts will be supported soon.')}/>
            </div>

            <div className="divider">OR</div>

            <div className='flex flex-col gap-4'>
                <TextBox label='Email' type='email' id='email' placeholder='kinangh98@gmail.com'
                         defaultValue={state.data.email}/>
                <PasswordTextBox label='Password' id='password' placeholder='*****'
                                 defaultValue={state.data.password}/>
                <Turnstile theme={theme.resolvedTheme === 'dark' ? 'dark' : 'light'} size='flexible'
                           sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY as string}/>
                <FormSubmitButton text='Log in' isPending={isPending} icon={<LoginIcon/>}/>

                <span className='text-sm'>Don&#39;t have an account? <Link
                    href={isAdmin ? '/auth/admin/signup' : '/auth/customer/signup'}
                    className='link link-primary link-hover font-medium'>Sign up</Link>
                    </span>
            </div>
        </form>
    );
}