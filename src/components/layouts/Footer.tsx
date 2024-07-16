"use client"
import Link from "next/link";
import { useEffect } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <footer className="text-gray-300 bg-black py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-20 pl-8  w-full gap-16 md:gap-10 lg:gap-5 xl:gap-10 ">
        <div className="footer-col-1 flex flex-col items-start">
          <Link
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0"
            href="/"
            className="text-4xl md:text-2xl font-semibold text-[#0369a1] hover:text-white duration-300"
          >
            Alibaba.
          </Link>
        </div>
        <div
          className="footer-col-2 flex flex-col items-start"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="300"
        >
          <p className="follow-text uppercase tracking-wider text-gray-400">{`Don't forget to follow us`}</p>
          <div className="social-icons">
            <div className="icon-circle">
              <FaFacebookF className="text-rose-100 mx-auto" />
            </div>
            <div className="icon-circle">
              <FaInstagram className="text-rose-100 mx-auto" />
            </div>
            <div className="icon-circle">
              <FaLinkedinIn className="text-rose-100 mx-auto" />
            </div>
            <div className="icon-circle">
              <FaTwitter className="text-rose-100 mx-auto" />
            </div>
          </div>
        </div>
        <div
          className="footer-col-3 flex flex-col items-start"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="600"
        >
          <p className="uppercase font-medium text-[#0284c7] tracking-wider">
            Useful Links
          </p>
          <div className="nav-link flex flex-col-2 mt-3 gap-10 justify-start">
            <div className="link-col-left flex flex-col text-left gap-1 uppercase">
              <Link href="/" className="footer-nav-links">
                Home
              </Link>
              <Link href="/products" className="footer-nav-links">
                Shop
              </Link>
              <Link href="/products/men" className="footer-nav-links">
                Men
              </Link>
              <Link href="/products/women" className="footer-nav-links">
                Women
              </Link>
            </div>
            <div className="link-col-right flex flex-col text-left gap-1 uppercase">
              <Link href="/inventory" className="footer-nav-links">
                Inventory
              </Link>
              <Link href="/about" className="footer-nav-links">
                About
              </Link>
              <Link href="/contact" className="footer-nav-links">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div
          className="footer-col-4 flex flex-col items-start xl:items-center gap-3"
          data-aos="flip-up"
          data-aos-duration="1500"
          data-aos-delay="1000"
        >
          <p className="uppercase tracking-wider text-gray-400">
            Need more informations?
          </p>
          <button className="footer-btn bg-[#0284c7] py-4 px-6 rounded-full uppercase text-sm font-medium hover:text-[#0ea5e9] hover:bg-[#f8fafc] duration-300">
            + New Message
          </button>
          <p className="font-medium text-lg">contact@alibaba.com</p>
        </div>
      </div>

      <p
        className="copyright border-t border-gray-500/40 pt-20 text-gray-400 wrapper text-center uppercase"
        
      >
        &copy; {new Date().getFullYear()} Alibaba. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;