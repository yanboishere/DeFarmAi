"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { poolService } from "@/services/poolService";
import { message } from "antd";

const PoolContext = createContext(undefined);

export function PoolProvider({ children }) {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const refreshPools = async () => {
    try {
      setLoading(true);
      const data = await poolService.getPools();
      setPools(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error("Failed to fetch pools:", err);
      setError("Failed to fetch pools. Please try again later.");
      message.error("Failed to fetch pools. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getAIRecommendations = async (riskPreference) => {
    try {
      return await poolService.getAIRecommendations(riskPreference);
    } catch (err) {
      console.error("Failed to get AI recommendations:", err);
      message.error(
        "Failed to get AI recommendations. Please try again later."
      );
      return [];
    }
  };

  useEffect(() => {
    refreshPools();
  }, []);

  return (
    <PoolContext.Provider
      value={{
        pools,
        loading,
        error,
        refreshPools,
        getAIRecommendations,
        lastUpdated,
      }}
    >
      {children}
    </PoolContext.Provider>
  );
}

export const usePools = () => {
  const context = useContext(PoolContext);
  if (context === undefined) {
    throw new Error("usePools must be used within a PoolProvider");
  }
  return context;
};
