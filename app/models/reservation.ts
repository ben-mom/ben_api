import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare client: string
  @column()
  declare event_id: number
  @column()
  declare total: number
  @column()
  declare status: string
  @column()
  declare paiement: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}