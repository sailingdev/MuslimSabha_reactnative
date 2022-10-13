/* eslint-disable prettier/prettier */
import storeModel from './../models';

const store = storeModel.create({
  userStore: {
    uid: '',
    email: '',
    username: '',
    password: '',
    error: '',
    loading1: false,
    loading2: false,
  },
});

export default store;
