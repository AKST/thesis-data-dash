import Index from 'src/routes/index'
import PackageRoot from 'src/routes/package'
import NotFound from 'src/routes/not-found'

export default {
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/package',
      component: PackageRoot,
      children: []
    },
    {
      path: '/*',
      component: NotFound
    }
  ]
}
