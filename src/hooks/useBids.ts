import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Bid } from '../types'

export function useBids(userId?: string) {
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      fetchBids()
    }
  }, [userId])

  async function fetchBids() {
    try {
      setLoading(true)
      
      const { data, error: bidsError } = await supabase
        .from('bids')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (bidsError) throw bidsError

      const formattedBids: Bid[] = (data || []).map(bid => ({
        id: bid.id,
        personId: bid.person_id,
        amount: bid.amount,
        message: bid.message || '',
        timestamp: new Date(bid.created_at)
      }))

      setBids(formattedBids)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching bids:', err)
    } finally {
      setLoading(false)
    }
  }

  async function placeBid(personId: string, amount: number, message?: string) {
    try {
      if (!userId) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('bids')
        .insert({
          person_id: personId,
          user_id: userId,
          amount,
          message
        })

      if (error) throw error

      await fetchBids()
      return { success: true }
    } catch (err) {
      console.error('Error placing bid:', err)
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to place bid' 
      }
    }
  }

  return { bids, loading, error, placeBid, refetch: fetchBids }
}
