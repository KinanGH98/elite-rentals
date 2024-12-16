import SignupPage from "@/app/pages/SignupPage";

export const metadata = {
    title: "Signup | Elite Rentals - Admin",
    description: "Become an Elite Rentals administrator. Sign up now to gain access to powerful tools for managing rentals, bookings, and business operations.",
};

export default function AdminSignupPage() {
    return (
        <div>
            <SignupPage isAdmin={true}/>
        </div>
    );
}