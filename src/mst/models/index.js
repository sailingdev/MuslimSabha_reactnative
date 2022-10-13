/* eslint-disable prettier/prettier */
import { types } from 'mobx-state-tree';

import userStore from './user';

const storeModel = types.model('Store', {
  userStore: userStore,
});

export default storeModel;
