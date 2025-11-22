/**
 * API Route: Individual Agent Operations
 * Handles activate, pause, configure for specific agents
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents/[agentId] - Get agent details
export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;

    const { data, error } = await supabase
      .from('agent_performance')
      .select('*')
      .eq('agent_id', agentId)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      agent: data,
    });
  } catch (error: any) {
    console.error(`❌ Error fetching agent ${params.agentId}:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PATCH /api/agents/[agentId] - Update agent (activate, pause, configure)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const body = await request.json();
    const { action, config } = body;

    if (action === 'activate') {
      // Activate agent
      const { data, error } = await supabase
        .from('agent_performance')
        .update({ status: 'active' })
        .eq('agent_id', agentId)
        .select()
        .single();

      if (error) throw error;

      // TODO: Call backend to start monitoring
      // await startAgentMonitoring(agentId);

      return NextResponse.json({
        success: true,
        agent: data,
        message: 'Agent activated successfully!',
      });
    }

    if (action === 'pause') {
      // Pause agent
      const { data, error } = await supabase
        .from('agent_performance')
        .update({ status: 'paused' })
        .eq('agent_id', agentId)
        .select()
        .single();

      if (error) throw error;

      // TODO: Call backend to stop monitoring
      // await stopAgentMonitoring(agentId);

      return NextResponse.json({
        success: true,
        agent: data,
        message: 'Agent paused successfully!',
      });
    }

    if (action === 'configure' && config) {
      // Update agent configuration
      const { data, error } = await supabase
        .from('agent_performance')
        .update({
          // Update configurable fields
          ...(config.agent_name && { agent_name: config.agent_name }),
          ...(config.chain_distribution && { chain_distribution: config.chain_distribution }),
        })
        .eq('agent_id', agentId)
        .select()
        .single();

      if (error) throw error;

      return NextResponse.json({
        success: true,
        agent: data,
        message: 'Agent configuration updated!',
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error(`❌ Error updating agent ${params.agentId}:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/agents/[agentId] - Delete agent
export async function DELETE(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;

    // Check if agent has funds
    const { data: agent } = await supabase
      .from('agent_performance')
      .select('total_value_managed')
      .eq('agent_id', agentId)
      .single();

    if (agent && agent.total_value_managed > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete agent with active funds. Withdraw first.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('agent_performance')
      .delete()
      .eq('agent_id', agentId);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Agent deleted successfully!',
    });
  } catch (error: any) {
    console.error(`❌ Error deleting agent ${params.agentId}:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

