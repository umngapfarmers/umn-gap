const loginMode = (state = 'login', action) => {
    switch (action.type) {
      case 'SET_TO_LOGIN_MODE':
        return 'login';
      case 'SET_TO_REGISTER_MODE':
        return 'register';
      case 'SET_TO_REGISTER_FARM':
        return 'registerFarm';
      case 'FORGOT_PASSWORD':
        return 'passwordRecovery';
      case 'CHECK_EMAIL_SUCCESS':
        return 'checkEmailSuccess';
      default:
        return state;
    }
  };

// loginMode will be on the redux state at:
// state.loginMode
  export default loginMode;
  