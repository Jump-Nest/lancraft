'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/company/lancraft', name: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/lancraftcz/', name: 'Instagram' },
    { icon: FaFacebook, href: 'https://www.facebook.com/lancraftcz/photos_albums', name: 'Facebook' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative bg-[#111111] py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-montserrat font-bold text-lg sm:text-xl mb-4">
              Kontakt
            </h3>
            <a
              href="mailto:info@lancraft.cz"
              className="text-gray-400 hover:text-yellow-400 transition-colors font-montserrat text-sm sm:text-base"
            >
              info@lancraft.cz
            </a>
          </motion.div>

          {/* Right: Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="flex gap-6 sm:gap-8">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-400 transition-colors text-2xl sm:text-3xl"
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
        <div className="border-t border-gray-800 my-8 sm:my-10"></div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          {/* Left: Company Info */}
          <div className="text-gray-400 font-montserrat text-xs sm:text-sm">
            <p>LanCraft s.r.o.</p>
            <p>Benešova 175, 471 52 Sloup v Čechách</p>
          </div>

          {/* Right: Legal Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:justify-end">
            <Link
              href="/ochrana-osobnich-udaju"
              className="text-gray-400 hover:text-yellow-400 transition-colors font-montserrat text-xs sm:text-sm"
            >
              Ochrana osobních údajů
            </Link>
            <Link
              href="/nastaveni-cookies"
              className="text-gray-400 hover:text-yellow-400 transition-colors font-montserrat text-xs sm:text-sm"
            >
              Nastavení cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}