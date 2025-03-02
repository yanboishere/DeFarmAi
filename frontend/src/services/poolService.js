// Mock pool data
const mockPools = [
  {
    id: "1",
    pair: "ETH-USDC",
    platform: "Uniswap V3",
    tvl: "$8.2M",
    volume24h: "$1.2M",
    apy: 25.5,
    aiScore: 8.5,
    riskLevel: "Medium",
    trend: "up",
  },
  {
    id: "2",
    pair: "BTC-USDT",
    platform: "Curve",
    tvl: "$12.5M",
    volume24h: "$3.4M",
    apy: 18.2,
    aiScore: 7.8,
    riskLevel: "Medium",
    trend: "stable",
  },
  {
    id: "3",
    pair: "USDC-USDT",
    platform: "Curve",
    tvl: "$45.7M",
    volume24h: "$8.9M",
    apy: 6.5,
    aiScore: 9.2,
    riskLevel: "Low",
    trend: "stable",
  },
  {
    id: "4",
    pair: "ETH-BTC",
    platform: "Balancer",
    tvl: "$5.1M",
    volume24h: "$0.9M",
    apy: 22.8,
    aiScore: 6.7,
    riskLevel: "High",
    trend: "down",
  },
  {
    id: "5",
    pair: "SOL-USDC",
    platform: "Raydium",
    tvl: "$3.8M",
    volume24h: "$1.5M",
    apy: 32.4,
    aiScore: 7.1,
    riskLevel: "High",
    trend: "up",
  },
  {
    id: "6",
    pair: "ETH-DAI",
    platform: "Uniswap V3",
    tvl: "$6.3M",
    volume24h: "$1.1M",
    apy: 19.7,
    aiScore: 8.0,
    riskLevel: "Medium",
    trend: "up",
  },
  {
    id: "7",
    pair: "MATIC-USDC",
    platform: "QuickSwap",
    tvl: "$2.9M",
    volume24h: "$0.7M",
    apy: 28.3,
    aiScore: 7.5,
    riskLevel: "Medium",
    trend: "up",
  },
  {
    id: "8",
    pair: "AVAX-USDC",
    platform: "Trader Joe",
    tvl: "$4.2M",
    volume24h: "$0.8M",
    apy: 26.9,
    aiScore: 7.3,
    riskLevel: "Medium",
    trend: "stable",
  },
];

export const poolService = {
  async getPools() {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPools);
      }, 800);
    });
  },

  async getAIRecommendations(riskPreference) {
    // Simulate AI recommendation logic
    let filtered = [...mockPools];

    if (riskPreference === "low") {
      filtered = filtered.filter((pool) => pool.riskLevel === "Low");
    } else if (riskPreference === "medium") {
      filtered = filtered.filter((pool) => pool.riskLevel === "Medium");
    } else if (riskPreference === "high") {
      filtered = filtered.filter((pool) => pool.riskLevel === "High");
    }

    // Sort by AI score
    filtered.sort((a, b) => b.aiScore - a.aiScore);

    return filtered.slice(0, 3); // Return top 3 recommendations
  },
};
