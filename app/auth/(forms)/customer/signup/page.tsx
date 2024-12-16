import SignupPage from "@/app/pages/SignupPage";

export const metadata = {
    title: "Signup | Elite Rentals",
    description: "Join the Elite Rentals community! Create an account to easily book your next car rental, access exclusive deals, and manage your bookings with ease.",
};

export default function CustomerSignupPage() {
    return (
        <SignupPage isAdmin={false}/>
    );
}