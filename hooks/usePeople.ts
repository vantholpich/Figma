import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Person } from '../types'

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPeople()
  }, [])

  async function fetchPeople() {
    try {
      setLoading(true)
      
      // Fetch people
      const { data: peopleData, error: peopleError } = await supabase
        .from('people')
        .select('*')
        .order('created_at', { ascending: false })

      if (peopleError) throw peopleError

      // Fetch testimonials for all people
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')

      if (testimonialsError) throw testimonialsError

      // Combine data
      const peopleWithTestimonials: Person[] = (peopleData || []).map(person => ({
        id: person.id,
        name: person.name,
        age: person.age,
        bio: person.bio,
        occupation: person.occupation,
        image: person.image,
        gallery: person.gallery || [],
        bids: person.bids_count || 0,
        auctionedBy: person.auctioned_by,
        about: person.about,
        pros: person.pros || [],
        cons: person.cons || [],
        interests: person.interests || [],
        testimonials: (testimonialsData || [])
          .filter(t => t.person_id === person.id)
          .map(t => ({
            name: t.name,
            text: t.text,
            avatar: t.avatar
          }))
      }))

      setPeople(peopleWithTestimonials)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching people:', err)
    } finally {
      setLoading(false)
    }
  }

  return { people, loading, error, refetch: fetchPeople }
}
