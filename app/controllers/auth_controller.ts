import User from '#models/user'
import { LoginValidator, RegisterValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

  async register({ request, auth }: HttpContext) {
    const data = await request.validateUsing(RegisterValidator)
    const user = await User.create(data)

    const  token  = await auth.use('api').createToken(user)

    return {
      message: 'User created',
      token,
      user,
    }
  }

  async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginValidator)

    const user = await User.verifyCredentials(email, password)

    const token  = await auth.use('api').createToken(user)

    return {
      message: 'Login successful',
      token,
      user,
    }
  }

  async me({ auth }: HttpContext) {
    await auth.use('api').authenticate()

    return {
      user: auth.user,
    }
  }
}
