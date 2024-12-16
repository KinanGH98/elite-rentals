import LogoLink from "@/app/components/LogoLink";
import Link from "next/link";

export const metadata = {
    title: 'Manage Bookings | Elite Rentals - Admin',
    description: 'View and manage all customer bookings within the Elite Rentals admin panel.',
};

export default function AdminBookings()
{
    return (
        <div className='flex flex-col gap-8 py-8 min-h-96 justify-center items-center h-full'>
            <LogoLink href='/admin/' replace/>
            <h2 className='text-2xl'>Coming soon...</h2>
            <Link
                href={'/admin/'}
                className='btn btn-outline'>
                Back to Dashboard
            </Link>
        </div>
    );
}