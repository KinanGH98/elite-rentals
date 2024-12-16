import {createServerClient} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

export async function updateSession(request: NextRequest)
{
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
        {
            cookies: {
                getAll()
                {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet)
                {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    cookiesToSet.forEach(({name, value, options}) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: {user},
    } = await supabase.auth.getUser()


    // Redirect un-authenticated users to the home page.
    if (
        !user &&
        request.nextUrl.pathname.startsWith('/admin') &&
        request.nextUrl.pathname.startsWith('/customer')
    )
    {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    // Redirect un-unauthorized users based on their role.
    if (user)
    {
        const role = user.user_metadata.role;

        // Redirect un-authorized admin users when they try to access customers pages.  
        if (role === 'admin' && request.nextUrl.pathname.startsWith('/customer'))
        {
            const url = request.nextUrl.clone()
            url.pathname = '/auth/customer/login'
            return NextResponse.redirect(url)
        }

        // Redirect un-authorized customer users when they try to access admin pages.  
        if (role === 'customer' && request.nextUrl.pathname.startsWith('/admin'))
        {
            const url = request.nextUrl.clone()
            url.pathname = '/auth/admin/login'
            return NextResponse.redirect(url)
        }

        // Redirect already authenticated admin users to admin dashboard when they try to access auth pages.  
        if ((role === 'admin' || role === 'both') && request.nextUrl.pathname.startsWith('/auth/admin'))
        {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/'
            return NextResponse.redirect(url)
        }

        // Redirect already authenticated customer users to customer dashboard when they try to access auth pages.  
        if ((role === 'customer' || role === 'both') && request.nextUrl.pathname.startsWith('/auth/customer'))
        {
            const url = request.nextUrl.clone()
            url.pathname = '/customer/'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}