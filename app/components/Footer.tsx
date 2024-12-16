import Link from "next/link";
import LogoLink from "@/app/components/LogoLink";

export default function Footer() {
    return (
        <footer className="footer bg-base-200 text-base-content p-10">
            <aside>
                <LogoLink href={'/'} size='md'/>
                <a className='link link-hover' href="https://kinangh98.github.io/">© 2024 Ahmed Kinan Ghbash</a>
            </aside>
            <nav>
                <h6 className="footer-title">Navigation</h6>
                <Link href={'/'} className="link link-hover">Home</Link>
                <Link href={'/customer'} className="link link-hover">Rent</Link>
                <Link href={'/admin'} className="link link-hover">Management</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a href={'https://www.canva.com/design/DAEQ9fb79b8/V5nJWy88hmShnBnUfleW2A/edit?utm_content=DAEQ9fb79b8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'} 
                   className="link link-hover">About us</a>
                <a href={'mailto:kinangh98@gmail.com'} className="link link-hover">Contact</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <Link href={`/privacy-policy`} className="link link-hover">Privacy policy</Link>
            </nav>
        </footer>
    );
}