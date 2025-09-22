import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin} from "react-icons/fa";
import "./footer.scss";

export default function Footer() {
    return (
        <>
         <footer className="footer">
            <div className="footer__left">
                <Link href="/" className="footer__logo">
                <Image 
                src="/Icon.png" 
                alt="logo"
                height={32}
                width={32}></Image>
                <span className="footer__title">SwapHub</span>
                </Link> 
            <div className="some__banner">
                <Link
                href="https://x.com/">
                    <FaTwitter></FaTwitter>
                </Link>
                 <Link
                href="https://instagram.com/">
                    <FaInstagram></FaInstagram>
                </Link>
                 <Link
                href="https://youtube.com/">
                    <FaYoutube></FaYoutube>
                </Link>
                 <Link
                href="https://linkedin.com/">
                    <FaLinkedin></FaLinkedin>
                </Link>
            
               
            </div>
            </div>
        
        <div className="footer__right">
           <nav className="footer__nav--first">
               <ul>
                <li>
                    <h1>About SwapHub</h1>
                    <Link href="">How it works</Link>
                </li>
                  <li>
                    <Link href="">Community guidelines</Link>
                </li>
                  <li>
                    <Link href="">Our Mission</Link>
                </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                </li>
               </ul>
           </nav>

               <nav className="footer__nav--second">
               <ul>
                <li>
                    <h1>Discover</h1>
                    <Link href="">Browse categories</Link>
                </li>
                  <li>
                    <Link href="">Popular swaps</Link>
                </li>
                  <li>
                    <Link href="">Successful stories</Link>
                </li>
                  <li>
                    <Link href="/contact">Upcoming events</Link>
                </li>
               </ul>
           </nav>
               <nav className="footer__nav--third">
               <ul>
                <li>
                    <h1>Support</h1>
                    <Link href="">Help Center</Link>
                </li>
                  <li>
                    <Link href="">FAQs</Link>
                </li>
                  <li>
                    <Link href="">Safety tips</Link>
                </li>
                  <li>
                    <Link href="/contact">Report an issue</Link>
                </li>
               </ul>
           </nav>

           </div>
        </footer>
        </>
    )
}