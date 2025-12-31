import { defineValidator } from '#validators/core'
import vine from '@vinejs/vine'

export const RegisterValidator = defineValidator(
  vine.compile(
    vine.object({
      email: vine
        .string()
        .email()
        .toLowerCase()
        .trim()
        .unique(async (db, value) => {
          const exist = await db.from('users').where('email', value).first()
          return !exist
        }),

      password: vine.string().minLength(6),
    })
  )
)

export const LoginValidator = defineValidator(
  vine.compile(
    vine.object({
      email: vine.string().email().toLowerCase().trim(),
      password: vine.string().minLength(8),
    })
  )
)
