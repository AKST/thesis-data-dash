import Index from 'src/routes/index'
import NotFound from 'src/routes/not-found'

export default {
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Index },
    { path: '/*', component: NotFound }
  ]
}
