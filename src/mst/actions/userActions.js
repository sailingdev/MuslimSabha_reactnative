/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import { getParent } from 'mobx-state-tree';
// import { Toast } from 'native-base';

const userActions = self => ({
  setEmail(email) {
    self.email_text = email;
  },
  setPassword(password) {
    self.password = password;
  },
  setUid() {
    self.uid = auth().currentUser.uid;
  },
  onLoginPress() {
    self.error = '';
    self.loading1 = true;

    auth()
      .signInWithEmailAndPassword(self.email_text, self.password)
      .then(() => this.onLoginSuccess())
      .catch(() => this.onLoginFailFirst());
  },
  onLoginFailFirst() {
    self.error = 'Wrong credentials or User does not exist';
    self.loading1 = false;
    self.loading2 = false;
  },
  onDupLoginFail() {
    self.error = 'User Already Exists';
    self.loading1 = false;
    self.loading2 = false;
  },
  onLoginFail() {
    self.error = 'Authentication Failed';
    self.loading1 = false;
    self.loading2 = false;
  },
  onLoginSuccess() {
    self.email_text = '';
    self.password = '';
    self.loading1 = false;
    self.loading2 = false;
    self.error = '';
    self.uid = auth().currentUser.uid;
  },
  onSignUpPress() {
    self.error = '';
    self.loading2 = true;
    auth()
      .createUserWithEmailAndPassword(self.email_text, self.password)
      .then(() =>
        database()
          .ref(`user/client/${auth().currentUser.uid}`)
          .set({ email: `${auth().currentUser.email}` })
      )
      .then(() => this.onLoginSuccess())
      .catch(() => this.onDupLoginFail());
  },
  resetUser() {
    self.uid = self.email = self.email_text = self.password = self.error = '';
    self.loading1 = self.loading2 = false;
  },

  signoutUser() {
    // Empty store
    this.resetUser();
    auth().signOut();
  },
});

export default userActions;
