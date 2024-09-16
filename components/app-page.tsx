"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBrandSlide, setCurrentBrandSlide] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(
    "Adhesives & Lubricants"
  );
  const [cart, setCart] = useState<Record<number, number>>({});

  const carouselItems = [
    { title: "LOCTITE", description: "For All Your Toughest Jobs." },
    { title: "MOLYKOTE", description: "High-Performance Lubricants" },
    { title: "EMERSON", description: "Innovative Industrial Solutions" },
  ];

  const categories = [
    "Adhesive & Lubricants",
    "Corrosion Prevention",
    "Fasteners",
    "Hardware & Tools",
    "Industrial Cleaner and Degreaser",
    "Lifting & Rigging",
    "Material Handling Equipments",
    "Safety Products",
    "Electrical",
  ];

  const brands = [
    "Ledlenser",
    "Lifmex",
    "3M",
    "ABB",
    "Band-It",
    "Loctite",
    "Molykote",
    "Emerson",
    "Belzona",
    "Dow",
  ];

  const productCategories = [
    "Adhesives & Lubricants",
    "Safety Products",
    "Material Handling Equipment",
  ];

  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
    { id: 4, name: "Product 4", price: 49.99 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]); // Include carouselItems.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandSlide((prev) => (prev + 1) % brands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [brands.length]); // Include brands.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for: ${searchTerm}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/placeholder.svg?height=50&width=150"
              alt="Maisam Trading LLC"
              className="h-12"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500 transition duration-300"
              >
                <Search size={20} />
              </button>
            </form>
            <Link
              href="/contact"
              className="hover:text-yellow-400 transition duration-300"
            >
              Contact Us
            </Link>
            <Link
              href="/support"
              className="hover:text-yellow-400 transition duration-300"
            >
              Support
            </Link>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300 flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              <span>{getTotalItems()}</span>
            </button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
          <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:space-x-4">
            <div className="relative group">
              <button
                className="flex items-center hover:text-yellow-400 px-2 py-1 rounded transition duration-300"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Shop by category <ChevronDown size={20} className="ml-1" />
              </button>
              <div className="absolute top-full left-0 bg-white text-gray-800 shadow-md rounded-md mt-1 py-2 w-64 z-10 hidden group-hover:block">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
            <Link
              href="/"
              className="hover:text-yellow-400 px-2 py-1 rounded transition duration-300"
            >
              Home
            </Link>
            <Link
              href="#"
              className="hover:text-yellow-400 px-2 py-1 rounded transition duration-300"
            >
              Shop by brand
            </Link>
            <Link
              href="/contact"
              className="hover:text-yellow-400 px-2 py-1 rounded transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="relative h-96 overflow-hidden">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: `linear-gradient(45deg, #1e40af, #3b82f6)`,
              }}
            >
              <div className="container mx-auto px-4">
                <h1 className="text-6xl font-bold text-white mb-4">
                  {item.title}
                </h1>
                <p className="text-3xl text-gray-200 mb-4">
                  {item.description}
                </p>
                <button className="bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
                  Send Inquiry
                </button>
              </div>
            </div>
          ))}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
            onClick={() =>
              setCurrentSlide(
                (prev) =>
                  (prev - 1 + carouselItems.length) % carouselItems.length
              )
            }
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
            }
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Loctite", "Emerson Instruments", "Molykote"].map((brand) => (
              <div
                key={brand}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{brand}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {brand}
                  </h3>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
                    Shop now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {currentCategory}
          </h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {productCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md transition duration-300 ${
                  currentCategory === category
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
                onClick={() => setCurrentCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {product.name}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </button>
                    {cart[product.id] && (
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 text-black p-1 rounded-md hover:bg-gray-300 transition duration-300"
                          onClick={() => removeFromCart(product.id)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{cart[product.id]}</span>
                        <button
                          className="bg-gray-200 text-black p-1 rounded-md hover:bg-gray-300 transition duration-300"
                          onClick={() => addToCart(product.id)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Brands We Sell
          </h2>
          <div className="relative overflow-hidden h-20">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentBrandSlide * (100 / 5)}%)`,
              }}
            >
              {brands.map((brand) => (
                <div key={brand} className="flex-none w-1/5 px-2">
                  <div className="h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {brand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Let us help you!</h2>
              <p className="mb-4">Largest Stockist of ADHESIVE & LUBRICANTS</p>
              <form onSubmit={handleSubscribe} className="flex mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for offers"
                  className="border p-2 rounded-l-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-black px-6 py-2 rounded-r-md hover:bg-yellow-500 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-yellow-400 transition duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Contact Information
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2" /> sales@maisamdubai.com
                </li>
                <li className="flex items-center">
                  <Phone size={16} className="mr-2" /> +97142318202
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2" /> Mon - Sat: 8:00AM -
                  8:00PM
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <Image
              src="/placeholder.svg?height=50&width=150"
              alt="Maisam Trading LLC"
              className="h-12 mb-4 md:mb-0"
            />
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-yellow-400 transition duration-300"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-400 transition duration-300"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-400 transition duration-300"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-400 transition duration-300"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="#"
                className="hover:text-yellow-400 transition duration-300"
              >
                <Youtube size={24} />
              </Link>
            </div>
          </div>
          <p className="text-center mt-4 text-sm">
            &copy; 2024 Maisam Trading LLC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
