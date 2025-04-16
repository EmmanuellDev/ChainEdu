import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-black border-t-2 shadow-md border-violet-900">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium text-blue-100">
          © {new Date().getFullYear()}{" "}
          <span className="text-violet-400">ChainED</span>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
