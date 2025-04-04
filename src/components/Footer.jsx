import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-base-300 text-base-content p-4 fixed bottom-0 flex justify-center items-center">
  <aside className="text-center text-sm md:text-base ">
    <p>Copyright © {new Date().getFullYear()} - All rights reserved by Dev MeetUp Industries Ltd</p>
  </aside>
</footer>

  );
};

export default Footer;