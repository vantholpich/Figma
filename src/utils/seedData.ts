import { supabase } from '../lib/supabase'
import { mockPeople } from '../data/mockData'

export async function seedDatabase() {
  try {
    console.log('Starting database seed...')

    // Insert people
    for (const person of mockPeople) {
      const { data: personData, error: personError } = await supabase
        .from('people')
        .insert({
          name: person.name,
          age: person.age,
          bio: person.bio,
          occupation: person.occupation,
          image: person.image,
          gallery: person.gallery,
          bids_count: person.bids,
          auctioned_by: person.auctionedBy,
          about: person.about,
          pros: person.pros,
          cons: person.cons,
          interests: person.interests
        })
        .select()
        .single()

      if (personError) {
        console.error('Error inserting person:', personError)
        continue
      }

      console.log(`Inserted person: ${person.name}`)

      // Insert testimonials for this person
      for (const testimonial of person.testimonials) {
        const { error: testimonialError } = await supabase
          .from('testimonials')
          .insert({
            person_id: personData.id,
            name: testimonial.name,
            text: testimonial.text,
            avatar: testimonial.avatar
          })

        if (testimonialError) {
          console.error('Error inserting testimonial:', testimonialError)
        }
      }
    }

    console.log('Database seeded successfully!')
    return { success: true }
  } catch (error) {
    console.error('Error seeding database:', error)
    return { success: false, error }
  }
}
