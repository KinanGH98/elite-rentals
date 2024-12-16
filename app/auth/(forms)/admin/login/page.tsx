import {LoginPage} from "@/app/pages/LoginPage";

export const metadata = {
    title: "Login | Elite Rentals - Admin",
    description: "Securely access the Elite Rentals admin panel to manage rentals, bookings, and more.",
};

export default function AdminLoginPage() {
    return (
        <div>
            <LoginPage isAdmin={true}/>
        </div>
    );
}