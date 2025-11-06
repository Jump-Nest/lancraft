'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Footer() {
  const columnOne = [
    'Pellentesque commodo tortor',
    'Arcu tincidunt eleifend',
    'Donec gravida tortor nec magna',
    'Vivamus nec ultrices dui',
    'Aenean sagittis massa in urna',
  ];

  const columnTwo = [
    'Pellentesque commodo tortor',
    'Arcu tincidunt eleifend',
    'Donec gravida tortor nec magna',
    'Vivamus nec ultrices dui',
    'Aenean sagittis massa in urna',
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', name: 'Facebook' },
    { icon: FaInstagram, href: '#', name: 'Instagram' },
    { icon: FaYoutube, href: '#', name: 'YouTube' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative bg-[#111111] py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mb-12 md:mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-montserrat font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Lorem ipsum dolor
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {columnOne.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors font-montserrat text-xs sm:text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Middle Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-montserrat font-bold text-lg sm:text-xl mb-6 sm:mb-8">
              Lorem ipsum dolor
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {columnTwo.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors font-montserrat text-xs sm:text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Logo */}
            <div className="w-40 sm:w-56 h-20 sm:h-28 mb-6 sm:mb-8 flex items-center justify-center">
              <Image
                src="/designs/lclogotranswhite.png"
                alt="LanCraft"
                width={220}
                height={110}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 sm:gap-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-white hover:text-yellow-400 transition-colors text-2xl sm:text-3xl md:text-4xl"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 sm:my-10 md:my-12"></div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-500 font-montserrat text-xs sm:text-sm">
            © {currentYear} LANCRAFT. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}