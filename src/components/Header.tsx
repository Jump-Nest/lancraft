'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'O NÁS', href: '#about' },
    { name: 'NAŠE AKTIVITY', href: '#projects' },
    { name: 'PRONÁJEM TECHNIKY', href: '#rental' },
    { name: 'REFERENCE', href: '#clients' },
    { name: 'KONTAKTUJTE NÁS', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 bg-black border-b border-gray-900"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex flex-col items-center gap-0">
            <Image
              src="/designs/lclogotranswhite.png"
              alt="LanCraft Logo"
              width={200}
              height={70}
              className="w-32 sm:w-40 md:w-48 h-10 sm:h-12 md:h-14 object-contain"
            />
            <span className="text-yellow-400 font-montserrat font-extrabold text-xs sm:text-sm tracking-widest">AGENCY</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white hover:text-yellow-400 transition-colors font-montserrat font-medium text-sm tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="lg:hidden text-2xl text-white"
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden bg-black overflow-hidden border-t border-gray-900"
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-white hover:text-yellow-400 transition-colors py-2 font-montserrat font-medium text-sm tracking-wide"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}