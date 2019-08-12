import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
const postRouters = [
  {
    path: '/edit/posts',
    component: Layout,
    children: [
      {
        path: '/edit/posts',
        name: 'EditPosts',
        component: () => import('@/views/edit/posts'),
        meta: { title: 'Edit Posts', icon: 'form' },
      },
    ],
  },
  {
    path: '/edit/post',
    component: Layout,
    children: [
      {
        path: '/edit/post/:postid',
        name: 'EditPost',
        component: () => import('@/views/edit/post'),
        meta: { title: 'Edit Post', icon: 'form' },
        hidden: true,
      },
      {
        path: '/edit/post',
        name: 'CreatePost',
        component: () => import('@/views/edit/post'),
        meta: { title: 'Create Post', icon: 'form' },
        hidden: true,
      },
    ],
  },
];

const workRouters = [
  {
    path: '/edit/works',
    component: Layout,
    children: [
      {
        path: '/edit/works',
        name: 'EditWorks',
        component: () => import('@/views/edit/works'),
        meta: { title: 'Edit Works', icon: 'form' },
      },
    ],
  }, {
    path: '/edit/work',
    component: Layout,
    children: [
      {
        path: '/edit/work/:workid',
        name: 'EditWork',
        component: () => import('@/views/edit/work'),
        meta: { title: 'Edit Work', icon: 'form' },
        hidden: true,
      },
      {
        path: '/edit/work',
        name: 'CreateWork',
        component: () => import('@/views/edit/work'),
        meta: { title: 'Create Work', icon: 'form' },
        hidden: true,
      },
    ],
  },
];
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' },
      },
    ],
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' },
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' },
  //     },
  //   ],
  // },
  {
    path: '/edit/intro',
    component: Layout,
    children: [
      {
        path: '/edit/intro',
        name: 'EditIntro',
        component: () => import('@/views/edit/intro'),
        meta: { title: 'Edit Intro', icon: 'form' },
      },
    ],
  },
  ...postRouters,
  ...workRouters,
  {
    path: '/edit/stacks',
    component: Layout,
    children: [
      {
        path: '/edit/stacks',
        name: 'EditStack',
        component: () => import('@/views/edit/stacks'),
        meta: { title: 'Edit Stack', icon: 'form' },
      },
    ],
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
