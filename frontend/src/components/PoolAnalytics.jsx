"use client";

import { useState } from "react";
import { usePools } from "@/context/PoolContext";
import {
  Tabs,
  Spin,
  Select,
  Button,
  Modal,
  Form,
  InputNumber,
  Radio,
} from "antd";
import { InfoCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import PoolCard from "./PoolCard";

export default function PoolAnalytics() {
  const { pools, loading, refreshPools } = usePools();
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("aiScore");
  const [configModalVisible, setConfigModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Filter and sort pools
  const getFilteredPools = () => {
    let filtered = [...pools];

    // Filter by tab
    if (activeTab === "recommended") {
      filtered = filtered.filter((pool) => pool.aiScore >= 7);
    } else if (activeTab === "trending") {
      filtered = filtered.filter((pool) => pool.trend === "up");
    }

    // Sort pools
    filtered.sort((a, b) => {
      if (sortBy === "apy") return b.apy - a.apy;
      if (sortBy === "aiScore") return b.aiScore - a.aiScore;
      return 0;
    });

    return filtered;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  const filteredPools = getFilteredPools();

  return (
    <div className="py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Pool Analytics</h1>
      </div>

      <div className="flex justify-center mb-6">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            { label: "All Pools", key: "all" },
            { label: "AI Recommended", key: "recommended" },
            { label: "Trending", key: "trending" },
          ]}
        />
      </div>

      <div className="flex justify-between items-center mb-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <Select
            defaultValue="aiScore"
            style={{ width: 140 }}
            onChange={setSortBy}
            options={[
              { value: "aiScore", label: "AI Score" },
              { value: "apy", label: "APY" },
            ]}
          />
        </div>

        <div className="flex gap-2">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => {
              /* Show info modal */
            }}
          >
            <InfoCircleOutlined />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={refreshPools}
          >
            <ReloadOutlined />
          </button>
          <Button type="primary" onClick={() => setConfigModalVisible(true)}>
            One-Click Setup
          </Button>
        </div>
      </div>

      <div className="mt-4 max-w-4xl mx-auto">
        {filteredPools.length > 0 ? (
          filteredPools.map((pool) => <PoolCard key={pool.id} {...pool} />)
        ) : (
          <div className="text-center py-10 text-gray-500">
            No pools match your current filters
          </div>
        )}
      </div>

      {/* One-Click Setup Modal */}
      <Modal
        title="One-Click Liquidity Setup"
        open={configModalVisible}
        onCancel={() => setConfigModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            setConfigModalVisible(false);
          }}
        >
          <Form.Item
            name="investmentAmount"
            label="Investment Amount (USD)"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="riskTolerance"
            label="Risk Tolerance"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio.Button value="low">Low</Radio.Button>
              <Radio.Button value="medium">Medium</Radio.Button>
              <Radio.Button value="high">High</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" block>
              Find Best Pools
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
