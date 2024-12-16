import {createClient} from "@/lib/supabase/server";
import Link from "next/link";
import Image, {StaticImageData} from 'next/image';
import carsCardImage from '@/public/images/admin-dashboard-cars-card.jpg';
import bookingsCardImage from '@/public/images/admin-dashboard-bookings-card.jpeg';

export const metadata = {
    title: 'Dashboard | Elite Rentals - Admin',
    description: 'Welcome to the Elite Rentals admin dashboard. Manage bookings, bookings, and more from a centralized hub.',
};

export default async function AdminDashboard()
{
    const supabase = await createClient();

    const {count: carCount} = await supabase
        .schema('elite_rentals')
        .from("cars")
        .select("*", {count: "exact", head: true});

    return (
        <div className="px-4 md:p-8 py-8 flex flex-col items-center gap-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">

                <ManageCard
                    linkHref="/admin/bookings/"
                    title="Manage Bookings"
                    description="View and manage all bookings made by customers."
                    backgroundImage={bookingsCardImage}
                    color="accent"
                    count={23}
                />

                <ManageCard
                    linkHref="/admin/cars/"
                    title="Manage Cars"
                    description="Add, update, or remove cars in your inventory."
                    backgroundImage={carsCardImage}
                    color="primary"
                    count={carCount || 0}
                />
            </div>
        </div>
    );
}

function ManageCard({
                        linkHref,
                        title,
                        description,
                        backgroundImage,
                        color,
                        count,
                    }: {
    linkHref: string;
    title: string;
    description: string;
    backgroundImage: StaticImageData;
    color: string;
    count: number;
})
{
    return (
        <Link href={linkHref}>
            <div
                className={`card card-compact sm:card-normal h-[250px] md:h-[500px] image-full w-full max-w-96 shadow-xl transform hover:scale-105 transition-transform`}>
                <figure>
                    <Image
                        fill
                        className='w-full rounded-box'
                        src={backgroundImage}
                        alt={title}/>
                </figure>

                <div className={`card-body text-${color}-content`}>
                    <h2 className={`card-title text-${color}`}>{title}</h2>
                    <p>{description}</p>

                    <div className="card-actions items-center justify-end">
                        
                        <span className={` mr-auto`}>
                            <span className={`text-${color} font-bold text-lg`}>{count}</span> <span
                            className='font-normal text-content text-sm'> {title.split(' ')[1].toLowerCase()}
                            </span>
                        </span>

                        <button className={`btn btn-${color} text-sm`}>Manage</button>
                    </div>
                </div>
            </div>
        </Link>
    );
}