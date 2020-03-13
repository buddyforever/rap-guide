import React from 'react';
import globalHook from 'use-global-hook';
import logo from '../images/logo-standard.jpg'
import logoEducator from '../images/logo-educator.jpg'
import logoStudent from '../images/logo-student.jpg'

const initialState = {
  name: "",
  type: "",
  logo: logo
};

const actions = {
  setName: (store, name) => {
    store.setState({ name: name });
  },
  setType: (store, type) => {
    store.setState({ type: type });
    if (type === 'administrator' || type === 'public') {
      store.setState({ logo: logo })
    }
    if (type === 'educator') {
      store.setState({ logo: logoEducator })
    }
    if (type === 'student') {
      store.setState({ logo: logoStudent })
    }
  },
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;