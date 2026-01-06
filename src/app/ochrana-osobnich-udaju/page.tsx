'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function OchranaOsobnichUdaju() {
  return (
    <main className="bg-black">
      <Header />
      
      {/* Add top padding for fixed header */}
      <div className="pt-20 md:pt-24" />

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-white mb-8 sm:mb-12">
              Ochrana osobních údajů
            </h1>

            <div className="space-y-6 text-gray-300 font-montserrat">
              <p className="text-sm sm:text-base leading-relaxed">
                Tato stránka je ve vývoji. Obsah bude doplněn.
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-8">
                Správce osobních údajů
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                LanCraft s.r.o.<br />
                Benešova 175<br />
                471 52 Sloup v Čechách<br />
                Česká republika
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-8">
                Kontakt
              </h2>
              <p className="text-sm sm:text-base leading-relaxed">
                E-mail: <a href="mailto:info@lancraft.cz" className="text-yellow-400 hover:text-yellow-500">info@lancraft.cz</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

