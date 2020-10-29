import recentlySeenActionTypes from "./recentlySeen.types";
import { addToList } from "./recentlySeen.utils";

const INITIAL_STATE = {
  recentlySeenList: [],
};

const recentlySeenReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case recentlySeenActionTypes.PUSH:
      return {
        ...state,
        recentlySeenList: addToList(state.recentlySeenList, payload),
      };
    case recentlySeenActionTypes.CLEAR:
      return {
        ...state,
        recentlySeenList: [],
      };
    // case recentlySeenActionTypes.POP:
    //   return {
    //     ...state,
    //     recentlySeenList: !!state.recentlySeenList.length
    //       ? state.recentlySeenList.splice(0, 1)
    //       : state.recentlySeenList,
    //   };
    default:
      return state;
  }
};

export default recentlySeenReducer;
