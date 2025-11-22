import { createClient } from '@supabase/supabase-js';

// Use placeholder values during build if env vars aren't set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

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
  failed_rebalances: number;
  status: 'active' | 'paused' | 'error';
  chain_distribution: Record<string, number>;
  last_rebalance_at: string;
  last_error?: string;
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
  expected_gain?: number;
  gas_cost?: number;
  execution_time_seconds?: number;
  status: 'pending' | 'confirmed' | 'failed';
  initiated_at: string;
  confirmed_at?: string;
  error_message?: string;
};

export type APRSnapshot = {
  id: string;
  chain: string;
  protocol: string;
  pool_address?: string;
  apr: number;
  tvl?: number;
  volume_24h?: number;
  volatility_score?: number;
  risk_score?: 'low' | 'medium' | 'high';
  snapshot_at: string;
  created_at: string;
};

export type UserPortfolio = {
  id: string;
  wallet_address: string;
  ens_name?: string;
  total_deposited: number;
  total_withdrawn: number;
  current_value: number;
  total_yield_earned: number;
  assigned_agent_id?: string;
  first_deposit_at?: string;
  last_activity_at?: string;
  created_at: string;
  updated_at: string;
};

export type ChainMetrics = {
  id: string;
  chain: string;
  chain_id: number;
  avg_apr?: number;
  total_tvl?: number;
  active_agents: number;
  total_value_locked: number;
  avg_rebalance_time_seconds?: number;
  success_rate?: number;
  snapshot_at: string;
  created_at: string;
};

// =====================================================
// QUERY FUNCTIONS
// =====================================================

// Get single agent performance (latest)
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

// Get all agents' latest performance
export async function getAllAgentsPerformance() {
  const { data, error } = await supabase
    .from('agent_summary')
    .select('*');

  if (error) throw error;
  return data;
}

// Get recent rebalances
export async function getRecentRebalances(limit = 10) {
  const { data, error } = await supabase
    .from('rebalancing_history')
    .select('*')
    .order('initiated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as RebalancingHistory[];
}

// Get rebalances for specific agent
export async function getAgentRebalances(agentId: string, limit = 20) {
  const { data, error } = await supabase
    .from('rebalancing_history')
    .select('*')
    .eq('agent_id', agentId)
    .order('initiated_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as RebalancingHistory[];
}

// Get chain APRs (latest snapshots)
export async function getChainAPRs() {
  const { data, error } = await supabase
    .from('apr_snapshots')
    .select('chain, apr, tvl, snapshot_at, protocol')
    .order('snapshot_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data as APRSnapshot[];
}

// Get APR history for a specific chain
export async function getChainAPRHistory(chain: string, hours = 24) {
  const hoursAgo = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  
  const { data, error } = await supabase
    .from('apr_snapshots')
    .select('*')
    .eq('chain', chain)
    .gte('snapshot_at', hoursAgo)
    .order('snapshot_at', { ascending: true });

  if (error) throw error;
  return data as APRSnapshot[];
}

// Get user portfolio by wallet address
export async function getUserPortfolio(walletAddress: string) {
  const { data, error } = await supabase
    .from('user_portfolios')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data as UserPortfolio | null;
}

// Get chain metrics (latest)
export async function getChainMetrics() {
  const { data, error } = await supabase
    .from('chain_metrics')
    .select('*')
    .order('snapshot_at', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data as ChainMetrics[];
}

// Get chain summary from view
export async function getChainSummary() {
  const { data, error } = await supabase
    .from('chain_summary')
    .select('*');

  if (error) throw error;
  return data;
}

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================

// Subscribe to agent performance updates
export function subscribeToAgentUpdates(
  agentId: string,
  callback: (data: AgentPerformance) => void
) {
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

// Subscribe to all rebalancing events
export function subscribeToRebalances(
  callback: (data: RebalancingHistory) => void
) {
  return supabase
    .channel('rebalances')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'rebalancing_history',
      },
      (payload) => callback(payload.new as RebalancingHistory)
    )
    .subscribe();
}

// Subscribe to APR updates for a specific chain
export function subscribeToChainAPR(
  chain: string,
  callback: (data: APRSnapshot) => void
) {
  return supabase
    .channel(`chain-${chain}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'apr_snapshots',
        filter: `chain=eq.${chain}`,
      },
      (payload) => callback(payload.new as APRSnapshot)
    )
    .subscribe();
}

// =====================================================
// AGGREGATE QUERIES
// =====================================================

// Get total stats across all agents
export async function getTotalStats() {
  const { data: agents, error } = await supabase
    .from('agent_summary')
    .select('*');

  if (error) throw error;

  const totalValue = agents?.reduce((sum, agent) => sum + (agent.current_value || 0), 0) || 0;
  const totalRebalances = agents?.reduce((sum, agent) => sum + (agent.total_rebalances || 0), 0) || 0;
  const avgAPR = agents && agents.length > 0
    ? agents.reduce((sum, agent) => sum + (agent.current_apr || 0), 0) / agents.length
    : 0;

  return {
    totalValue,
    totalRebalances,
    avgAPR: Number(avgAPR.toFixed(2)),
    activeAgents: agents?.filter(a => a.status === 'active').length || 0,
    totalAgents: agents?.length || 0,
  };
}

// Get rebalance success rate
export async function getRebalanceSuccessRate() {
  const { data, error } = await supabase
    .from('rebalancing_history')
    .select('status');

  if (error) throw error;

  const total = data?.length || 0;
  const successful = data?.filter(r => r.status === 'confirmed').length || 0;

  return {
    total,
    successful,
    failed: total - successful,
    successRate: total > 0 ? Number(((successful / total) * 100).toFixed(2)) : 0,
  };
}
