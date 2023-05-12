// Coloque aqui suas actions
import USER_REQUEST_LOGIN from './actionTypes';

const userLogin = ({ email }) => ({
  type: USER_REQUEST_LOGIN,
  dataLogin: {
    email,
  },
});

export default userLogin;
// export const userLogin = () => ({
//   type: ,
// });
