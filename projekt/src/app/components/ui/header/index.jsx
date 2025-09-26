// Kilder: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API & https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage & https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener & https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener & https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent & https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT & https://react.dev/learn/you-might-not-need-an-effect#sharing-logic-between-event-handlers
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./header.scss";
import SignOutButton from "../buttons/signout-button";
import { FiUser } from "react-icons/fi";

export default function Header() {
   const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
  
    const checkAuth = () => {
      const token = localStorage.getItem("sh_token");
      setUserLoggedIn(!!token);
    };

    checkAuth();
    
    
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);


    const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };






    return (
        <>
        <header className="header" >
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
            <button 
             className="header__menu--toggle"
             onClick={() => setMenuOpen(!menuOpen)}
             >
                 ☰
            </button>
        
       <div className={`header__right ${menuOpen ? "open" : ""}`}>
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
           
           </Link>

         <div className="header__button">
          {userLoggedIn ? (
            <SignOutButton onSignOut={() => setUserLoggedIn(false)} />
          ) : (
            <Link href="/signin" className="header__signin">
              Sign in
            </Link>
          )}
        </div>
           </div>
        </header>
        </>
    );
}