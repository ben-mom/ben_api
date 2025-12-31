 import type { HttpContext } from '@adonisjs/core/http'
 import Event from '#models/event'
import { EventValidator } from '#validators/event'


export default class EventsController {  
    public async liste({response}: HttpContext ) {
        const events = await Event.all()
        return response.json(events)
    } 
    // POST /events
     public async stores({ request, response }: HttpContext) {
        try {
          const data = await request.validateUsing(EventValidator)
          const event = await Event.create(data)
  
          return response.created({
            message: 'evenement créé avec succès',
            data: event,
          })
        } catch (error) {
          return response.badRequest({
            message: 'Erreur lors de la création',
            error: error.messages || error,
          })
        }
      }
    // PUT /events/:id
    
  public async update({ params, request, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }

    const data = request.only(['name', 'lieux', 'categorie', 'date'])

    event.merge(data)
    await event.save()

    return response.ok(event)
  }
  // DELETE /events/:id
  public async destroy({ params, response }: HttpContext) {
    const event = await Event.find(params.id)

    if (!event) {
      return response.notFound({ message: 'Event not found' })
    }

    await event.delete()

    return response.ok({ message: 'Event deleted successfully' })
  }
}


  


