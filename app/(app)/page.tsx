import Link from "next/link";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import Image from 'next/image';
import * as m from "framer-motion/m"
import user1 from '@/public/images/testimonials/user (1).jpg';
import user2 from '@/public/images/testimonials/user (2).jpg';
import user3 from '@/public/images/testimonials/user (3).jpg';
import carOwnersBg from '@/public/images/car-owners.jpg';
import HomePageFeaturedCarsCarousel from "@/app/(app)/HomePageFeaturedCarsCarousel";
import {Car} from "@/lib/types/models";
import {createClient} from "@/lib/supabase/server";
import {FaCarSide, FaHeadset, FaSackDollar} from "react-icons/fa6";
import {IconType} from "react-icons";

export const metadata = {
    title: 'Elite Rentals | Discover Your Perfect Ride',
};

// Animation Variants
const fadeInUp = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
};

const fadeInRight = {
    hidden: {opacity: 0, x: 15},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

const fadeIn = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.8}},
};

const stagger = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const fadeInFromBottom = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0, transition: {duration: 0.8}},
};

const fadeInFromLeft = {
    hidden: {opacity: 0, x: -50},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

const slideInFromRight = {
    hidden: {opacity: 0, x: 15},
    visible: {opacity: 1, x: 0, transition: {duration: 0.8}},
};

export default async function HomePage()
{
    const supabase = await createClient();
    const {data: carsData, error} = await supabase
        .schema('elite_rentals')
        .from('cars')
        .select('*')
        .not('img_urls', 'is', null)
        .gte('price_per_day', 60)
        .order('price_per_day', {ascending: false});

    if (error) throw new Error(error.message);
    const featuredCars: Car[] = carsData as Car[];

    return (
        <>
            <NavBar position="fixed"/>

            <main className="flex gap-16 flex-col justify-center">
                <div>
                    {/* Hero Section */}
                    <m.section
                        className="relative min-h-screen flex items-center bg-cover bg-center"
                        style={{backgroundImage: "url('/images/hero-background.jpg')"}}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Background Overlay */}
                        <m.div
                            className="absolute inset-0 bg-neutral bg-opacity-70 lg:bg-opacity-60 xl:bg-opacity-50"
                            variants={fadeIn}
                        />

                        {/* Text Content */}
                        <m.div
                            className="relative max-w-[650px] px-6 sm:pl-16 lg:pl-24 text-gray-200 py-20 pb-10"
                            variants={fadeInUp}
                        >
                            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
                                Discover Your Perfect Ride
                            </h1>
                            <p className="text-lg leading-relaxed mb-6">
                                Explore a wide range of premium cars tailored to fit your lifestyle. Whether it&#39;s a
                                family trip, a
                                business meeting, or an adventure, we have the perfect ride waiting for you.
                            </p>
                            <Link href={"/auth/customer/login/"} className="btn btn-primary px-8 text-lg">
                                Rent a Car
                            </Link>
                        </m.div>
                    </m.section>

                    {/* Stats Section */}
                    <section className="py-16 px-6 text-center bg-neutral text-neutral-content">
                        <h2 className="text-4xl  mb-12 font-bold">Our Achievements</h2>
                        <m.div
                            className="stats stats-vertical md:stats-horizontal shadow w-full lg:w-3/4 mx-auto overflow-y-hidden"
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{amount: 'all', once: true}}
                        >
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">Happy Customers</div>
                                <div className="stat-value text-primary">12K+</div>
                                <div className="stat-desc">Since 2022</div>
                            </m.div>
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">Cars Listed</div>
                                <div className="stat-value text-primary">1.5K</div>
                                <div className="stat-desc">Available Nationwide</div>
                            </m.div>
                            <m.div className="stat" variants={fadeInUp}>
                                <div className="stat-title">Total Bookings</div>
                                <div className="stat-value text-primary">50K+</div>
                                <div className="stat-desc">Across all locations</div>
                            </m.div>
                        </m.div>
                    </section>

                    {/* Why Choose Us Section */}
                    <m.section
                        className="py-16 px-6 bg-base-100 flex flex-col lg:flex-row gap-8 items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{amount: 0.3, once: true}}
                        variants={stagger}
                    >
                        <m.div
                            className="text-center lg:text-right lg:w-1/2"
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl font-bold  mb-12 text-primary">
                                Why Choose Us
                            </h2>
                            <p className="text-lg">
                                We go above and beyond to provide you with an unforgettable experience. From competitive
                                pricing to our
                                vast selection of vehicles, here’s why we’re the trusted choice for car rentals.
                            </p>
                        </m.div>

                        <m.div
                            className="inline-flex gap-4 flex-col w-full lg:w-1/2 sm:items-center"
                            variants={stagger}
                        >
                            <WhyChooseUsItem
                                Icon={FaSackDollar}
                                title="Affordable Pricing"
                                description="Get access to premium cars at prices that suit your budget. We believe luxury shouldn&#39;t come at an exorbitant cost."
                            />

                            <WhyChooseUsItem
                                Icon={FaCarSide}
                                title="Wide Selection"
                                description="Choose from sedans, SUVs, and more from trusted owners. We’ve got a vehicle for every need, preference, and destination."
                                className="sm:ml-16"
                            />

                            <WhyChooseUsItem
                                Icon={FaHeadset}
                                title="24/7 Support"
                                description="We’re here to help you anytime, anywhere. Your satisfaction and convenience are our top priorities."
                                className="sm:ml-8"
                            />
                        </m.div>
                    </m.section>

                    {/* Featured Cars Section */}
                    <section className="px-6 py-16">
                        <h2 className="text-4xl mb-8 font-bold text-center">
                            Featured Cars
                        </h2>
                        <p className="text-lg mb-8 text-center">
                            ✦ Handpicked vehicles that combine luxury, style, and performance ✦
                        </p>
                        <HomePageFeaturedCarsCarousel cars={featuredCars}/>
                    </section>

                    {/* Car Owners Section */}
                    <section className="py-16 px-6 xl:px-24 bg-base-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2 h-64 relative">
                                <Image
                                    src={carOwnersBg}
                                    fill
                                    alt="Car owners image."
                                    className="rounded-lg shadow-lg object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h2 className="text-4xl font-bold mb-4 text-accent">Earn Money with Your Car</h2>
                                <p className="text-lg mb-6">
                                    Turn your idle car into an income generator by listing it on our platform. Reach
                                    thousands of renters in just a few clicks! Secure, reliable, and hassle-free, start
                                    earning from your car today.
                                </p>
                                <Link href={"/auth/admin/login/"} className="btn btn-accent px-6 py-3">
                                    Start Earning
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Testimonials Section */}
                <m.section
                    className="py-4 px-6"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                >
                    <m.h2
                        className="text-4xl font-bold text-center  mb-12 text-primary"
                        variants={fadeInFromBottom}
                    >
                        What Our Users Say
                    </m.h2>
                    <m.p
                        className="text-lg mb-8 text-center"
                        variants={fadeInFromBottom}
                    >
                        We take pride in delivering top-notch service and making car rentals a delightful experience.
                        Hear what our satisfied customers have to say!
                    </m.p>
                    <m.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={stagger}
                    >
                        {[
                            {
                                name: "Jane Doe",
                                feedback: "The easiest car rental experience I've ever had!",
                                image: user1,
                            },
                            {
                                name: "John Smith",
                                feedback: "Fantastic customer support and great prices!",
                                image: user2,
                            },
                            {
                                name: "Christopher Kaiser",
                                feedback: "Highly recommended! Hassle-free and reliable service.",
                                image: user3,
                            },
                        ].map(({name, feedback, image}, index) => (
                            <m.div
                                key={index}
                                className="card w-full bg-base-100 shadow-xl"
                                variants={fadeInFromBottom}
                            >
                                <div className="card-body">
                                    <div
                                        className="flex md:flex-col md:text-center lg:flex-row lg:text-left gap-4 items-center">
                                        <Image
                                            src={image}
                                            height={60}
                                            width={60}
                                            alt={name}
                                            className="rounded-full w-16 h-16"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold">{name}</h3>
                                            <p className="text-base">{feedback}</p>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        ))}
                    </m.div>
                </m.section>

                {/* How It Works Section */}
                <m.section
                    className="py-20 px-6 bg-neutral"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                >
                    <m.h2
                        className="text-4xl font-semibold text-center  mb-12 text-primary"
                        variants={fadeInFromBottom}
                    >
                        How It Works
                    </m.h2>
                    <m.ol
                        className="steps steps-vertical md:steps-horizontal mx-auto w-full text-neutral-content"
                        variants={stagger}
                    >
                        {["Search", "Book", "Drive"].map((step, index) => (
                            <m.li
                                key={index}
                                className="step step-primary"
                                variants={fadeInFromLeft}
                            >
                                {step}: {index === 0 && "Browse through our extensive car listings."}
                                {index === 1 && "Choose your car and make a secure booking."}
                                {index === 2 && "Pick up your car and hit the road!"}
                            </m.li>
                        ))}
                    </m.ol>
                </m.section>

                {/* CTA Section */}
                <m.section
                    className="pb-16 px-6 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    variants={stagger}
                >
                    <m.h2
                        className="text-4xl font-bold mb-6"
                        variants={fadeInFromBottom}
                    >
                        Ready to Book Your Ride?
                    </m.h2>
                    <m.p
                        className="text-lg mb-8"
                        variants={fadeInFromBottom}
                    >
                        Don’t wait! Find your dream car today and start your adventure.
                    </m.p>
                    <m.div variants={slideInFromRight}>
                        <Link href={"/auth/customer/login/"} className="btn btn-primary px-8 text-lg">
                            Rent Now
                        </Link>
                    </m.div>
                </m.section>
            </main>

            <Footer/>
        </>
    );
}

function WhyChooseUsItem({className = '', Icon, title, description}: {
    className?: string,
    Icon: IconType,
    title: string,
    description: string
})
{
    return (
        <m.div
            className={`sm:w-4/5 h-full bg-primary rounded-2xl shadow-lg text-primary-content ${className}`}
            whileHover={{scale: 1.05}}
            variants={fadeInRight}
        >
            <div className="flex gap-6 items-center p-4">
                <Icon className="w-16 text-4xl shrink-0"/>
                <span>
          <h3 className="text-xl font-bold">{title}</h3>
          <p>{description}</p>
        </span>
            </div>
        </m.div>
    );
}