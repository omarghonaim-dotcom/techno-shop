"use client";

import Link from "next/link";

import { FaInstagram, FaTelegram, FaXTwitter } from "react-icons/fa6";

import { FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {

return (<footer className="w-full">

{/* Top Newsletter Section */}

<div className="bg-[#24002F] text-white py-8">

<div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">

{/* Social Media */}

<div>

<h3 className="text-lg font-semibold mb-3">Social Media</h3>

<div className="flex gap-3">

<a href="#" className="w-12 h-12 rounded-xl bg-[#A66BCF] flex items-center justify-center hover:bg-[#8e4ec0] transition">

<FaXTwitter size={24} />

</a>

<a href="#" className="w-12 h-12 rounded-xl bg-[#A66BCF] flex items-center justify-center hover:bg-[#8e4ec0] transition">

<FaInstagram size={24} />

</a>

<a href="#" className="w-12 h-12 rounded-xl bg-[#A66BCF] flex items-center justify-center hover:bg-[#8e4ec0] transition">

<FaTelegram size={24} />

</a>

</div>

</div>

{/* Newsletter */}

<div className="w-full lg:w-auto text-center lg:text-right">

<p className="mb-3 text-sm lg:text-base">

Enter your email to receive the latest news and offers

</p>

<div className="flex flex-col sm:flex-row gap-3">

<button className="bg-[#6A0DAD] hover:bg-[#5b0a95] px-8 py-3 rounded-xl font-semibold transition">

Subscribe

</button>

<input type="email" placeholder="Your email" className="bg-transparent border border-gray-400 rounded-xl px-4 py-3 outline-none focus:border-purple-500 w-full sm:w-80" />

</div>

</div>

</div>

</div>

{/* Main Footer */}

<div className="bg-[#ECECEC] py-14">

<div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-center lg:text-right">

{/* Logo & Address */}

<div>

<div className="flex items-center justify-center lg:justify-start gap-3 mb-6">

<div className="w-16 h-16 border-4 border-purple-700 rounded-xl flex items-center justify-center">

<span className="text-purple-700 text-3xl font-bold">T</span>

</div>

<h2 className="text-3xl font-bold text-purple-700">TechnoShop</h2>

</div>

<h4 className="font-bold text-purple-700 mb-3">Store Address:</h4>

<p className="text-gray-700 leading-7 text-sm">

Tehran, Valiasr Street, Valiasr Plaza, Javid Alley, Block 24 <br /> Postal Code: 1593484382

</p>

{/* Trust Badges */}

<div className="flex justify-center lg:justify-start gap-4 mt-8">

<div className="w-20 h-20 bg-white rounded-lg shadow flex items-center justify-center text-xs text-center p-2">Trust</div>

<div className="w-20 h-20 bg-white rounded-lg shadow flex items-center justify-center text-xs text-center p-2">Certified</div>

<div className="w-20 h-20 bg-white rounded-lg shadow flex items-center justify-center text-xs text-center p-2">eNAMAD</div>

</div>

</div>

{/* Support */}

<div>

<h3 className="text-2xl font-bold text-purple-700 mb-6">Support</h3>

<p className="text-gray-700 mb-6">Saturday to Thursday - 8:30 AM to 6:30 PM</p>

<div className="flex items-center justify-center lg:justify-start gap-2 mb-4 text-purple-700">

<FiMail size={20} />

<span>technoshop@gmail.com</span>

</div>

<div className="flex items-center justify-center lg:justify-start gap-2 text-purple-700">

<FiPhone size={20} />

<span>Customer Service: 0110000</span>

</div>

</div>

{/* Online Store */}

<div>

<h3 className="text-2xl font-bold text-purple-700 mb-6">Online Store</h3>

<ul className="space-y-4 text-gray-700">

<li><Link href="#" className="hover:text-purple-700">About Us</Link></li>

<li><Link href="#" className="hover:text-purple-700">Contact Us</Link></li>

<li><Link href="#" className="hover:text-purple-700">Terms & Conditions</Link></li>

<li><Link href="#" className="hover:text-purple-700">Customer Reviews</Link></li>

</ul>

</div>

{/* Buy Laptop */}

<div>

<h3 className="text-2xl font-bold text-purple-700 mb-6">Buy Laptop</h3>

<ul className="space-y-4 text-gray-700">

<li><Link href="#" className="hover:text-purple-700">Choose Smart Laptop</Link></li>

<li><Link href="#" className="hover:text-purple-700">Lenovo Laptop Prices</Link></li>

<li><Link href="#" className="hover:text-purple-700">ASUS Laptop Prices</Link></li>

<li><Link href="#" className="hover:text-purple-700">HP Laptop Prices</Link></li>

</ul>

</div>

{/* Services */}

<div>

<h3 className="text-2xl font-bold text-purple-700 mb-6">Services</h3>

<ul className="space-y-4 text-gray-700">

<li><Link href="#" className="hover:text-purple-700">Laptop Prices</Link></li>

<li><Link href="#" className="hover:text-purple-700">Used Laptop Purchase</Link></li>

<li><Link href="#" className="hover:text-purple-700">Warranty</Link></li>

<li><Link href="#" className="hover:text-purple-700">Installment Purchase</Link></li>

</ul>

</div>

</div>

</div>

{/* Bottom Copyright */}

<div className="bg-[#6A0DAD] text-white py-5 text-center">

<p className="text-sm">

All material and content rights belong to TechnoShop.

</p>

</div>

</footer>

);

}