import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  name: ""
};

const actions = {
  setName: (store, name) => {
    store.setState({ name: name });
  },
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;