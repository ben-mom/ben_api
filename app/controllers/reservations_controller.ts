import type { HttpContext } from '@adonisjs/core/http'
import { ReservationValidator } from '#validators/reservation'
import Reservation from '#models/reservation'

export default class ReservationsController {
  
  public async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(ReservationValidator)
      const reservation = await Reservation.create(data)

      return response.created({
        message: 'Réservation créée avec succès',
        data: reservation,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création',
        error: error.messages || error,
      })
    }
  }

    public async liste({response}: HttpContext ) {
        const reservations = await Reservation.all()
        return response.json(reservations)
    }

  public async show({ params, response }: HttpContext) {
    const reservation = await Reservation.findOrFail(params.id)
    return response.json(reservation)
  }

  public async update({ params, request, response }: HttpContext) {
    const reservation = await Reservation.find(params.id)
    if (!reservation) {
      return response.notFound({ message: 'Réservation introuvable' })
    }

    const data = await request.validateUsing(ReservationValidator)
    reservation.merge(data)
    await reservation.save()

    return { message: 'Réservation mise à jour', data: reservation }
  }

  
  public async destroy({ params, response }: HttpContext) {
    const reservation = await Reservation.find(params.id)
    if (!reservation) {
      return response.notFound({ message: 'Réservation introuvable' })
    }

    await reservation.delete()
    return { message: 'Réservation supprimée' }
  }
}