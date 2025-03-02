"use client";

import React from "react";
import { WalletOutlined, SettingOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <span className="text-xl font-semibold">
              AI Liquidity Assistant
            </span>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => {
                /* TODO: Implement wallet connection */
              }}
            >
              <WalletOutlined className="mr-2" />
              <span>Connect Wallet</span>
            </button>

            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => {
                /* TODO: Implement settings */
              }}
            >
              <SettingOutlined className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
