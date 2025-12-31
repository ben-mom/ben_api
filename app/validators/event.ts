import vine from '@vinejs/vine'
import { defineValidator } from '#validators/core'


export const EventValidator = defineValidator(
  vine.compile(
    vine.object({
      name: vine.string().trim().minLength(3).maxLength(255),
      lieux: vine.string().trim().minLength(3).maxLength(255),
      categorie: vine.string().trim().minLength(3).maxLength(255),
      date: vine.string().trim().minLength(3).maxLength(255),
    })
  )
)
