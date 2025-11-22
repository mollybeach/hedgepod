/**
 * API Route: Agent Rebalancing History
 * Get all rebalancing transactions for a specific agent
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/agents/[agentId]/history - Get agent rebalancing history
export async function GET(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error, count } = await supabase
      .from('rebalancing_history')
      .select('*', { count: 'exact' })
      .eq('agent_id', agentId)
      .order('initiated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      history: data || [],
      count: count || 0,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error(`❌ Error fetching history for agent ${params.agentId}:`, error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

