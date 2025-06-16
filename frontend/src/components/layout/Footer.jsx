
// File: src/components/layout/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-auto">
      <p className="text-gray-600">
        © {new Date().getFullYear()} Task Tracker. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;