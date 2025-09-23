"use client";

import Link from "next/link";
import Image from "next/image";
import "./header.scss";
import SignOutButton from "../signout-button";
import { FiUser } from "react-icons/fi"


export default function Header({ user }) {
   

    return (
        <>
        <header className="header">
            <div className="header__left">
                <Link href="/" className="header__logo">
                <Image 
                src="/Icon.png" 
                alt="logo"
                height={32}
                width={32}></Image>
                <span className="header__title">SwapHub</span>
                </Link> 
            </div>
        
        <div className="header__right">
           <nav className="header__nav">
               <ul>
                <li>
                    <Link href="/">Listings</Link>
                </li>
                  <li>
                    <Link href="/community">Community</Link>
                </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                </li>
               </ul>
           </nav>
           
           <Link
           href="/profile" className="profile__link">
            <FiUser size={24}></FiUser>
            <span>Profile</span>
           </Link>

           <div className="header__button">
            {user ? (
                <SignOutButton></SignOutButton>
            ) : (
            <Link
            href="/signin"
            className="header__signin"
            >
                Sign in
            </Link>
)}
           </div>
           </div>
        </header>
        </>
    );
}