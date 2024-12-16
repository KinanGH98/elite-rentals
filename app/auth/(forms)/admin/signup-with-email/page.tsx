import SignupWithEmailPage from "@/app/pages/SignupWithEmailPage";

export const metadata = {
    title: "Signup With Email | Elite Rentals - Admin",
    description: "Become an Elite Rentals administrator. Sign up now to gain access to powerful tools for managing rentals, bookings, and business operations.",
};

export default function AdminSignupWithEmailPage()
{
    return <SignupWithEmailPage isAdmin={true}/>;
}