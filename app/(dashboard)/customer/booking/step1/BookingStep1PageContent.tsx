﻿'use client'
import {Car} from "@/lib/types/models";
import BookingCarDetails from "@/app/(dashboard)/customer/booking/step1/BookingCarDetails";
import {FormEvent, ReactNode, useState} from "react";
import {getDaysCountFromDateRange} from "@/lib/util/util";
import BookingMap from "@/app/(dashboard)/customer/booking/step1/BookingMap";
import {FaCalendarDays, FaDownLong, FaMapLocation, FaUpLong} from "react-icons/fa6";
import {rentTimes} from "@/lib/types/rentTimes";
import {createCheckoutSession} from "@/app/(dashboard)/customer/booking/step1/action";
import {toast} from "react-toastify";
import {MoonLoader} from "react-spinners";

type BookingInfoType = {
    car: Car,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rentDate: any,
    deliveryLocation: { lat: number; lng: number; }
}

export default function BookingStep1PageContent({car, rentDate, deliveryLocation}: BookingInfoType)
{
    const rentDaysCount = getDaysCountFromDateRange(rentDate['pickup-date']);
    const pickupDates = rentDate['pickup-date'].split('-');
    const pickupTime = rentTimes.find(time => time.value == rentDate['pickup-time'])?.label;

    const [isRedirectingToStripe, setIsRedirectingToStripe] = useState(false)

    const handleCheckout = async (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        setIsRedirectingToStripe(true);

        const {url, error} = await createCheckoutSession({
                name: `${car.manufacturer} ${car.model}`,
                price: car.price_per_day * rentDaysCount,
                imageUrls: car.img_urls
            },
            `${process.env.NEXT_PUBLIC_BASE_URL}/customer/booking/step3?${window.location.href.split('?')[1]}&session_id={CHECKOUT_SESSION_ID}`,
            window.location.href);


        if (error || !url)
        {
            toast.error(`Failed to redirect to checkout: ${error}`);
            setIsRedirectingToStripe(false);
            return;
        }

        window.location.href = url;
    };

    return (
        <div className="flex flex-col gap-8 py-10 px-4 md:px-8 lg:px-14">

            <ul className="steps mx-auto w-full max-w-[1000]">
                <li className="step step-primary">Details</li>
                <li className="step ">Checkout</li>
                <li className="step">Done!</li>
            </ul>

            <div className="flex flex-col lg:flex-row justify-evenly lg:items-start gap-8">
                <BookingCarDetails props={car}/>

                {/* Booking Details Pane */}
                <div className="flex flex-col gap-4 lg:w-2/5  h-auto bg-base-100 p-6 rounded-2xl shadow-lg">
                    <h2 className='text-2xl font-bold'>Booking details</h2>

                    <BookingItem title={'Rent Duration'} icon={<FaCalendarDays className='text-primary'/>}>
                        {rentDaysCount} days
                    </BookingItem>

                    <BookingItem title={'Pick-up Date & Time'} icon={<FaDownLong className='text-primary'/>}>
                        {pickupDates[0]} - {pickupTime}
                    </BookingItem>

                    <BookingItem title={'Drop-off Date & Time'} icon={<FaUpLong className='text-primary'/>}>
                        {pickupDates[1]} - 12:00 AM
                    </BookingItem>

                    <BookingItem title={'Delivery Location'} icon={<FaMapLocation className='text-primary'/>}/>
                    <BookingMap className='w-full h-56 rounded-lg overflow-hidden '
                                defaultLocation={deliveryLocation}/>

                    <span className="flex justify-between items-center gap-2 text-primary text-xl font-semibold">
                        <span>Total Price</span>
                        ${car.price_per_day * rentDaysCount}
                    </span>

                    <form onSubmit={handleCheckout} id='checkoutForm'>
                        <button disabled={isRedirectingToStripe} className="btn btn-primary w-full">
                            {isRedirectingToStripe ?
                                <><MoonLoader size='20'/> Redirecting</> :
                                <h5>Proceed to Checkout</h5>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function BookingItem({title, icon, children}: { title: string, icon: ReactNode, children?: ReactNode })
{
    return (
        <span className="flex flex-col">
            <span
                className='flex items-center text-gray-500 dark:text-zinc-400 gap-2 font-semibold'>{icon} {title}</span>
            {children && <span className='font-bold text-lg'>{children}</span>}
        </span>
    );
}