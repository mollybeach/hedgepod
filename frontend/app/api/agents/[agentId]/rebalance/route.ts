/**
 * API Route: Trigger Agent Rebalance
 * Manually trigger a rebalance for a specific agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;

    if (!agentId) {
      return NextResponse.json(
        { success: false, error: 'Agent ID required' },
        { status: 400 }
      );
    }

    // Check if agent exists and is active
    const { data: agent, error: fetchError } = await supabase
      .from('agent_performance')
      .select('*')
      .eq('agent_id', agentId)
      .single();

    if (fetchError || !agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    if (agent.status !== 'active') {
      return NextResponse.json(
        { success: false, error: 'Agent must be active to rebalance' },
        { status: 400 }
      );
    }

    // TODO: Implement actual rebalancing logic
    // For now, simulate a rebalance by updating the database
    
    // Simulate rebalancing with mock data
    const mockFromChain = 'base';
    const mockToChain = 'optimism';
    const mockAmount = '100.00';
    const mockTxHash = '0x' + Array.from({length: 64}, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    // Update agent stats
    const { error: updateError } = await supabase
      .from('agent_performance')
      .update({
        total_rebalances: (agent.total_rebalances || 0) + 1,
        successful_rebalances: (agent.successful_rebalances || 0) + 1,
        last_rebalance_at: new Date().toISOString(),
      })
      .eq('agent_id', agentId);

    if (updateError) {
      console.error('Error updating agent stats:', updateError);
    }

    return NextResponse.json({
      success: true,
      message: 'Rebalance initiated successfully',
      rebalance: {
        agentId,
        from_chain: mockFromChain,
        to_chain: mockToChain,
        amount: mockAmount,
        txHash: mockTxHash,
        timestamp: new Date().toISOString(),
        status: 'completed',
        expected_gain: parseFloat((Math.random() * 10).toFixed(2)), // Mock gain
      },
    });
  } catch (error: any) {
    console.error('Error triggering rebalance:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
