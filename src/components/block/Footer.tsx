import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-6 mt-auto">
      <div className="container flex justify-between mx-auto px-4 text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} Floa. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="https://x.com/jit_infinity" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
            Twitter
          </Link>
          <Link href="mailto:rely.prasanjit@gmail.com" className="hover:text-blue-400 transition-colors duration-300">
            Email
          </Link>
          <Link href="https://github.com/prasanjit101/floa-lite" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
