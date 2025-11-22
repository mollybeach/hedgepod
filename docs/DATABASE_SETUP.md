# 🗄️ HedgePod Database Setup - Supabase

## 🎯 Why Supabase?

Perfect for ETHGlobal hackathons:
- ✅ **Free tier** - No credit card required
- ✅ **5 minutes setup** - Deploy instantly
- ✅ **Real-time** - Live agent performance updates
- ✅ **PostgreSQL** - Reliable and fast
- ✅ **Auto-generated API** - REST + GraphQL
- ✅ **Next.js integration** - First-class support

---

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project

1. Go to https://supabase.com/
2. Click "Start your project"
3. Create account (GitHub login recommended)
4. Click "New Project"
   - **Name**: `hedgepod`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to you
   - **Plan**: Free tier
5. Wait ~2 minutes for database to provision

### 2. Get Your API Keys

1. Go to **Settings** → **API**
2. Copy these values:

```bash
# Add to your .env file
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-key-here
```

### 3. Create Database Schema

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Paste the schema below
4. Click "Run"

---

## 📊 Database Schema

```sql
-- =====================================================
-- HedgePod Agent Database Schema
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. AGENT PERFORMANCE TABLE
-- =====================================================
CREATE TABLE agent_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  agent_id VARCHAR(50) NOT NULL,
  agent_name VARCHAR(100) NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Performance metrics
  total_value_managed DECIMAL(20, 6) NOT NULL,
  current_apr DECIMAL(10, 4) NOT NULL,
  total_rebalances INTEGER DEFAULT 0,
  successful_rebalances INTEGER DEFAULT 0,
  failed_rebalances INTEGER DEFAULT 0,
  
  -- Chain distribution
  chain_distribution JSONB NOT NULL,
  -- Example: {"base": 1000, "polygon": 500, "celo": 300}
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  -- active, paused, error
  
  last_rebalance_at TIMESTAMPTZ,
  last_error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX idx_agent_performance_agent_id ON agent_performance(agent_id);
CREATE INDEX idx_agent_performance_timestamp ON agent_performance(timestamp DESC);

-- =====================================================
-- 2. REBALANCING HISTORY TABLE
-- =====================================================
CREATE TABLE rebalancing_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Agent info
  agent_id VARCHAR(50) NOT NULL,
  
  -- Transaction details
  tx_hash VARCHAR(66) NOT NULL UNIQUE,
  from_chain VARCHAR(50) NOT NULL,
  to_chain VARCHAR(50) NOT NULL,
  amount DECIMAL(20, 6) NOT NULL,
  token VARCHAR(10) NOT NULL,
  
  -- APR comparison
  from_apr DECIMAL(10, 4),
  to_apr DECIMAL(10, 4),
  expected_gain DECIMAL(10, 4),
  
  -- Execution details
  gas_cost DECIMAL(20, 8),
  execution_time_seconds INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  -- pending, confirmed, failed
  
  -- Metadata
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_rebalancing_agent_id ON rebalancing_history(agent_id);
CREATE INDEX idx_rebalancing_tx_hash ON rebalancing_history(tx_hash);
CREATE INDEX idx_rebalancing_status ON rebalancing_history(status);
CREATE INDEX idx_rebalancing_initiated_at ON rebalancing_history(initiated_at DESC);

-- =====================================================
-- 3. APR SNAPSHOTS TABLE
-- =====================================================
CREATE TABLE apr_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Chain and protocol
  chain VARCHAR(50) NOT NULL,
  protocol VARCHAR(50) NOT NULL,
  pool_address VARCHAR(66),
  
  -- APR data
  apr DECIMAL(10, 4) NOT NULL,
  tvl DECIMAL(20, 2),
  volume_24h DECIMAL(20, 2),
  
  -- Volatility
  volatility_score DECIMAL(6, 4),
  risk_score VARCHAR(10),
  -- low, medium, high
  
  -- Timestamp
  snapshot_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_apr_chain ON apr_snapshots(chain);
CREATE INDEX idx_apr_snapshot_at ON apr_snapshots(snapshot_at DESC);
CREATE INDEX idx_apr_chain_protocol ON apr_snapshots(chain, protocol);

-- =====================================================
-- 4. USER PORTFOLIOS TABLE (Optional)
-- =====================================================
CREATE TABLE user_portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- User identification
  wallet_address VARCHAR(66) NOT NULL UNIQUE,
  ens_name VARCHAR(100),
  
  -- Portfolio stats
  total_deposited DECIMAL(20, 6) DEFAULT 0,
  total_withdrawn DECIMAL(20, 6) DEFAULT 0,
  current_value DECIMAL(20, 6) DEFAULT 0,
  total_yield_earned DECIMAL(20, 6) DEFAULT 0,
  
  -- Agent assignment
  assigned_agent_id VARCHAR(50),
  
  -- Metadata
  first_deposit_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_portfolio_wallet ON user_portfolios(wallet_address);
CREATE INDEX idx_portfolio_agent ON user_portfolios(assigned_agent_id);

-- =====================================================
-- 5. CHAIN METRICS TABLE
-- =====================================================
CREATE TABLE chain_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Chain info
  chain VARCHAR(50) NOT NULL,
  chain_id INTEGER NOT NULL,
  
  -- Metrics
  avg_apr DECIMAL(10, 4),
  total_tvl DECIMAL(20, 2),
  active_agents INTEGER DEFAULT 0,
  total_value_locked DECIMAL(20, 6) DEFAULT 0,
  
  -- Performance
  avg_rebalance_time_seconds INTEGER,
  success_rate DECIMAL(5, 2),
  
  -- Timestamp
  snapshot_at TIMESTAMPTZ DEFAULT NOW(),
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_chain_metrics_chain ON chain_metrics(chain);
CREATE INDEX idx_chain_metrics_snapshot ON chain_metrics(snapshot_at DESC);

-- =====================================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE agent_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE rebalancing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE apr_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for performance data (for demo/dashboard)
CREATE POLICY "Allow public read on agent_performance" 
  ON agent_performance FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read on rebalancing_history" 
  ON rebalancing_history FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read on apr_snapshots" 
  ON apr_snapshots FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read on chain_metrics" 
  ON chain_metrics FOR SELECT 
  USING (true);

-- Users can only see their own portfolio
CREATE POLICY "Users can view own portfolio" 
  ON user_portfolios FOR SELECT 
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

-- Service role can insert/update everything (for backend agent)
-- (No policy needed - service key bypasses RLS)

-- =====================================================
-- 7. CREATE VIEWS FOR DASHBOARD
-- =====================================================

-- Agent summary view
CREATE VIEW agent_summary AS
SELECT 
  agent_id,
  agent_name,
  MAX(total_value_managed) as current_value,
  MAX(current_apr) as current_apr,
  MAX(total_rebalances) as total_rebalances,
  MAX(successful_rebalances) as successful_rebalances,
  ROUND(
    (MAX(successful_rebalances)::DECIMAL / NULLIF(MAX(total_rebalances), 0)) * 100, 
    2
  ) as success_rate,
  MAX(last_rebalance_at) as last_active,
  MAX(status) as status
FROM agent_performance
GROUP BY agent_id, agent_name
ORDER BY current_value DESC;

-- Chain summary view
CREATE VIEW chain_summary AS
SELECT 
  chain,
  AVG(apr) as avg_apr,
  MAX(snapshot_at) as last_updated,
  COUNT(*) as data_points
FROM apr_snapshots
WHERE snapshot_at > NOW() - INTERVAL '24 hours'
GROUP BY chain
ORDER BY avg_apr DESC;

-- Recent rebalances view
CREATE VIEW recent_rebalances AS
SELECT 
  r.agent_id,
  r.tx_hash,
  r.from_chain,
  r.to_chain,
  r.amount,
  r.token,
  r.to_apr - r.from_apr as apr_improvement,
  r.status,
  r.initiated_at
FROM rebalancing_history r
ORDER BY r.initiated_at DESC
LIMIT 100;

-- =====================================================
-- 8. FUNCTIONS FOR AUTO-UPDATE TIMESTAMPS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to tables that need auto-update
CREATE TRIGGER update_agent_performance_updated_at BEFORE UPDATE ON agent_performance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_portfolios_updated_at BEFORE UPDATE ON user_portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DONE! ✅
-- =====================================================
```

---

## 🔌 Install Supabase Client

```bash
cd frontend
npm install @supabase/supabase-js
```

---

## 💻 Frontend Integration

Create `/frontend/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types (auto-generated or manual)
export type AgentPerformance = {
  id: string;
  agent_id: string;
  agent_name: string;
  total_value_managed: number;
  current_apr: number;
  total_rebalances: number;
  successful_rebalances: number;
  status: 'active' | 'paused' | 'error';
  chain_distribution: Record<string, number>;
  last_rebalance_at: string;
  created_at: string;
  updated_at: string;
};

export type RebalancingHistory = {
  id: string;
  agent_id: string;
  tx_hash: string;
  from_chain: string;
  to_chain: string;
  amount: number;
  token: string;
  from_apr: number;
  to_apr: number;
  status: 'pending' | 'confirmed' | 'failed';
  initiated_at: string;
};

// Example queries
export async function getAgentPerformance(agentId: string) {
  const { data, error } = await supabase
    .from('agent_performance')
    .select('*')
    .eq('agent_id', agentId)
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data as AgentPerformance;
}

export async function getRecentRebalances(limit = 10) {
  const { data, error } = await supabase
    .from('rebalancing_history')
    .select('*')
    .order('initiated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as RebalancingHistory[];
}

export async function getChainAPRs() {
  const { data, error } = await supabase
    .from('apr_snapshots')
    .select('chain, apr, tvl, snapshot_at')
    .order('snapshot_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Real-time subscription for agent updates
export function subscribeToAgentUpdates(agentId: string, callback: (data: AgentPerformance) => void) {
  return supabase
    .channel(`agent-${agentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'agent_performance',
        filter: `agent_id=eq.${agentId}`,
      },
      (payload) => callback(payload.new as AgentPerformance)
    )
    .subscribe();
}
```

---

## 📱 Example Usage in Components

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getAgentPerformance, subscribeToAgentUpdates } from '@/lib/supabase';

export function AgentDashboard({ agentId }: { agentId: string }) {
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    // Initial load
    getAgentPerformance(agentId).then(setPerformance);

    // Subscribe to real-time updates
    const subscription = subscribeToAgentUpdates(agentId, setPerformance);

    return () => {
      subscription.unsubscribe();
    };
  }, [agentId]);

  if (!performance) return <div>Loading...</div>;

  return (
    <div>
      <h2>{performance.agent_name}</h2>
      <p>Total Value: ${performance.total_value_managed}</p>
      <p>Current APR: {performance.current_apr}%</p>
      <p>Rebalances: {performance.total_rebalances}</p>
      <p>Status: {performance.status}</p>
    </div>
  );
}
```

---

## 🔧 Backend Integration (Agent)

Create `/backend/src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Use service key for backend (bypasses RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Log agent performance
export async function logAgentPerformance(data: {
  agent_id: string;
  agent_name: string;
  total_value_managed: number;
  current_apr: number;
  total_rebalances: number;
  successful_rebalances: number;
  chain_distribution: Record<string, number>;
  status: string;
}) {
  const { error } = await supabase
    .from('agent_performance')
    .insert(data);

  if (error) {
    console.error('Failed to log agent performance:', error);
    throw error;
  }
}

// Log rebalancing transaction
export async function logRebalance(data: {
  agent_id: string;
  tx_hash: string;
  from_chain: string;
  to_chain: string;
  amount: number;
  token: string;
  from_apr: number;
  to_apr: number;
  status: string;
}) {
  const { error } = await supabase
    .from('rebalancing_history')
    .insert(data);

  if (error) {
    console.error('Failed to log rebalance:', error);
    throw error;
  }
}

// Update rebalance status
export async function updateRebalanceStatus(
  tx_hash: string,
  status: 'confirmed' | 'failed',
  error_message?: string
) {
  const { error } = await supabase
    .from('rebalancing_history')
    .update({
      status,
      confirmed_at: new Date().toISOString(),
      error_message,
    })
    .eq('tx_hash', tx_hash);

  if (error) {
    console.error('Failed to update rebalance status:', error);
    throw error;
  }
}

// Log APR snapshot
export async function logAPRSnapshot(data: {
  chain: string;
  protocol: string;
  apr: number;
  tvl?: number;
  volatility_score?: number;
}) {
  const { error } = await supabase
    .from('apr_snapshots')
    .insert(data);

  if (error) {
    console.error('Failed to log APR snapshot:', error);
    throw error;
  }
}
```

---

## 📊 What This Gives You for ETHGlobal

1. **Live Dashboard** - Real-time agent performance updates
2. **Historical Data** - Show rebalancing history and APR trends
3. **Analytics** - Chain comparison, success rates, profit tracking
4. **Demos** - Populate with fake data for judges to see
5. **Professional** - Shows you understand full-stack architecture

---

## 🎯 Quick Test Data

Insert test data to make your dashboard look good:

```sql
-- Insert test agent performance
INSERT INTO agent_performance (agent_id, agent_name, total_value_managed, current_apr, total_rebalances, successful_rebalances, chain_distribution, status) VALUES
('agent-1', 'HedgePod Agent #1', 10000.00, 12.50, 15, 14, '{"base": 4000, "polygon": 3000, "celo": 3000}'::jsonb, 'active'),
('agent-2', 'HedgePod Agent #2', 25000.00, 15.75, 23, 22, '{"base": 10000, "polygon": 8000, "celo": 7000}'::jsonb, 'active'),
('agent-3', 'HedgePod Agent #3', 50000.00, 18.30, 45, 43, '{"base": 20000, "polygon": 18000, "celo": 12000}'::jsonb, 'active');

-- Insert test rebalancing history
INSERT INTO rebalancing_history (agent_id, tx_hash, from_chain, to_chain, amount, token, from_apr, to_apr, status) VALUES
('agent-1', '0x1234...', 'base', 'polygon', 1000.00, 'USDC', 10.5, 14.2, 'confirmed'),
('agent-1', '0x5678...', 'polygon', 'celo', 1500.00, 'USDC', 14.2, 16.8, 'confirmed'),
('agent-2', '0x9abc...', 'base', 'celo', 2500.00, 'USDC', 11.3, 15.9, 'confirmed');

-- Insert test APR snapshots
INSERT INTO apr_snapshots (chain, protocol, apr, tvl) VALUES
('base', 'aave', 12.50, 1000000),
('polygon', 'compound', 15.75, 800000),
('celo', 'uniswap', 18.30, 500000);
```

---

## ✅ Done!

Your HedgePod app now has:
- ✅ Professional database backend
- ✅ Real-time updates
- ✅ Historical analytics
- ✅ Ready for ETHGlobal demos

**Next steps:**
1. Add database queries to your frontend pages
2. Create analytics dashboard
3. Show judges real-time agent performance!

---

**🦔 Making DeFi data-driven!**

