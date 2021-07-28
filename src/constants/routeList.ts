import BasicRenderPage from '../views/demo/BasicRenderPage.vue'
import { RouteRecordRaw } from 'vue-router'
import CustomEdgePage from '../views/demo/CustomEdgePage.vue'
import ContextMenuPage from '../views/demo/ContextMenuPage.vue'
import VContextMenuExamplePage from '../views/demo/VContextMenuExamplePage.vue'
import CustomLayoutPage from '../views/demo/CustomLayoutPage.vue'
import NodeActionPage from '../views/demo/NodeActionPage.vue'
import PanAndZoomPage from '../views/demo/PanAndZoomPage.vue'
import HomePage from '../views/home/HomePage.vue'

export const routeList: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    strict: true,
  },
  {
    path: '/basic-render',
    component: BasicRenderPage,
  },
  {
    path: '/custom-edge',
    component: CustomEdgePage,
  },
  {
    path: '/context-menu',
    component: ContextMenuPage,
  },
  {
    path: '/v-context-menu-example',
    component: VContextMenuExamplePage,
  },
  {
    path: '/custom-layout',
    component: CustomLayoutPage,
  },
  {
    path: '/node-action',
    component: NodeActionPage,
  },
  {
    path: '/pan-zoom',
    component: PanAndZoomPage,
  },
]
