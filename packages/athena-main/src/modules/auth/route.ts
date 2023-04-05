import { RouteRecordData } from '@/router/types';
import Authorize from './views/Authorize.vue';

const routeData: RouteRecordData = {
  route: [
    {
      path: '/authorize',
      name: 'authorize',
      component: Authorize,
      meta: {
        title: '登录',
      },
    },
  ],
};

export default routeData;
