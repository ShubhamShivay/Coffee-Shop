import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#fcf9f9] text-gray-600 py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
            <h5 className="text-lg font-bold mb-2">Project Milestone</h5>
            <p className="text-sm">Invoice Management Made Easy</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
            <h5 className="text-lg font-bold mb-2">Quick Links</h5>
            <ul>
              <li className="text-sm mb-2">
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
              </li>
              <li className="text-sm mb-2">
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li className="text-sm mb-2">
                <a href="contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
            <h5 className="text-lg font-bold mb-2">Get in Touch</h5>
            <p className="text-sm">support@coffeeshop.com</p>
            <p className="text-sm">+1 555 555 5555</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">
            <span>© 2024</span> Copyright 2024 Project coffeeshop. All rights
            reserved.
          </p>
          <hr className="my-4" />
          <span>Made with ❤️ by Shubham Kumar</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
