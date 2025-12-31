/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


const ReservationsController = ()=> import('#controllers/reservations_controller')
const EventsController = ()=> import('#controllers/events_controller')
//  Auth
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.get('/me', [AuthController, 'me']).as('auth.me').use(middleware.auth())

// Page d'accueil API
router.get('/', async () => {
  return { message: 'Bienvenue sur mon API Adonis !' }
})


router
  .group(() => {
    router.get('/', [EventsController, 'liste'])
    router.post('/', [EventsController, 'stores'])
    router.put('/:id', [EventsController, 'update'])
    router.delete('/:id', [EventsController, 'destroy'])
  })
  .prefix('/events')

router
  .group(() => {
    router.get('/', [ReservationsController, 'liste'])
    router.post('/', [ReservationsController, 'store'])
    router.get('/:id', [ReservationsController, 'show'])
    router.put('/:id', [ReservationsController, 'update'])
    router.delete('/:id', [ReservationsController, 'destroy'])
  })
  .prefix('/reservations')  
