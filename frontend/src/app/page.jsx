"use client";

import { ConfigProvider } from "antd";
import { PoolProvider } from "@/context/PoolContext";
import Navbar from "@/components/Navbar";
import PoolAnalytics from "@/components/PoolAnalytics";

export default function Home() {
  return (
    <ConfigProvider>
      <PoolProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4">
            <PoolAnalytics />
          </main>
        </div>
      </PoolProvider>
    </ConfigProvider>
  );
}
