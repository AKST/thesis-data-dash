import Navlinks, { Link } from 'src/services/nav-links'

export default {
  $nav: new Navlinks([
    new Link('/releases', 'Releases'),
    new Link('/projects', 'Projects')
  ])
}
