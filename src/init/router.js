import Index from 'src/routes/index'
import PackageRoot from 'src/routes/package'
import PackageList from 'src/routes/package/list'
import PackageItem from 'src/routes/package/item'
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
      path: '/releases',
      component: NotFound,
    },
    {
      path: '/package',
      component: PackageRoot,
      children: [{
        path: '',
        component: PackageList
      }, {
        path: ':id',
        component: PackageItem
      }]
    },
    {
      path: '/*',
      component: NotFound
    }
  ]
}
