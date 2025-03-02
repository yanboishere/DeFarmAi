"use client";

import React from "react";
import { Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const PoolCard = ({
  id,
  pair,
  platform,
  tvl,
  volume24h,
  apy,
  aiScore,
  riskLevel,
  trend,
}) => {
  const getRiskLevelTag = (level) => {
    switch (level) {
      case "Low":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Low
          </span>
        );
      case "Medium":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            Medium
          </span>
        );
      case "High":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            High
          </span>
        );
      default:
        return null;
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") {
      return <ArrowUpOutlined className="text-green-500 ml-1" />;
    } else if (trend === "down") {
      return <ArrowDownOutlined className="text-red-500 ml-1" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{pair}</h3>
            <span className="text-gray-500">{platform}</span>
          </div>

          <div className="text-gray-600 mb-3">
            <div>$ TVL: {tvl}</div>
            <div>% 24h Volume: {volume24h}</div>
          </div>

          <div className="mt-2">Risk Level: {getRiskLevelTag(riskLevel)}</div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end">
            <span className="text-3xl font-bold text-blue-600">{apy}%</span>
            {getTrendIcon()}
          </div>
          <div className="text-gray-600 mb-3">APY</div>

          <div className="mb-3">
            <div className="flex items-center justify-end">
              <span className="font-medium">{aiScore}</span>
            </div>
            <div className="text-gray-600">AI Score</div>
          </div>

          <Button type="primary" size="large">
            Add Liquidity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
