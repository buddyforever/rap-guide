import React from "react";
import globalHook from 'use-global-hook';

const initialState = {
  annotations: ["<h4>First Annotation Information</h4><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Voluptate alias reiciendis ad repellendus! Qui nostrum modi repellat.</p>",
    "<h4>Second Annotation Information</h4><p>doloremque ea unde molestias impedit quaerat officiis, necessitatibus quas nulla laboriosam a labore.</p>"],
  videos: 0 | localStorage.getItem('videos')
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
  addVideo: (store) => {
    const newVideos = store.state.videos + 1;
    localStorage.setItem("videos", newVideos);
    store.setState({ videos: newVideos });
  }
};

const useGlobal = globalHook(React, initialState, actions);

export default useGlobal;