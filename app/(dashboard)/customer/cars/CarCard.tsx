﻿import {Car} from "@/lib/types/models";
import Link from "next/link";
import Image from "next/image";
import {fuelTypes} from "@/lib/types/fuelTypes";
import {CarIcon, CarSeat, GasPump, RightArrowIcon} from "@/app/icons";

export default function CarCard({props, href, rentDaysCount}: {
    props: Car,
    href: string,
    rentDaysCount: number
})
{
    return (
        <Link
            className="card bg-base-100 rounded-box overflow-hidden w-full shadow-lg hover:shadow-xl transition-shadow group"
            href={href}>

            <figure className="relative h-56 w-full rounded-t-lg overflow-hidden">
                <Image
                    fill
                    unoptimized
                    src={props.img_urls[0]}
                    alt={`${props.manufacturer} ${props.model} image`}
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-white"
                     style={{backgroundColor: props.color}}
                     title="Color of the car"
                />
            </figure>

            <div className="card-body p-6 pb-7 gap-4">
                <h3 className="card-title items-end text-2xl font-bold mb-2">{props.manufacturer} {props.model}</h3>

                <IconsSection props={props}/>


                <div className="card-actions items-center relative">
                    <div
                        className='w-52 h-16 -mr-6 -mb-7 ml-auto bg-neutral rounded-full justify-center items-center rounded-r-none flex  relative'
                    >
                                       <span
                                           className='btn btn-primary btn-circle btn-sm border-0 absolute left-4 top-4 transition-[padding] group-hover:pl-2'><RightArrowIcon/></span>

                        <div className='flex flex-col ml-auto items-end pr-6'>
                                <span
                                    className="text-sm font-medium text-slate-300">Price for {rentDaysCount} days:</span>
                            <h3 className="font-bold text-lg text-primary">${props.price_per_day * rentDaysCount}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}


function IconsSection({props}: { props: Car })
{
    return (
        <div className='flex my-4 gap-6 justify-evenly font-medium'>

            <div className="tooltip tooltip-primary" data-tip="Fuel Type">
                <div className="flex flex-col items-center gap-2">
                    <GasPump width={'1.4em'}/>
                    <span>{fuelTypes[props.fuel - 1].label}</span>
                </div>
            </div>

            <div className="tooltip tooltip-primary" data-tip="Seats Count">
                <div className="flex flex-col items-center gap-2">
                    <CarSeat/>
                    <span>{props.seats} seat{props.seats > 1 ? 's' : ''}</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 tooltip tooltip-primary" data-tip="Car Type">
                <CarIcon/>
                <span>{props.type_display}</span>
            </div>
        </div>
    );
}