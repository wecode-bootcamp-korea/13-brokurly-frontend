import recentlySeenActionTypes from "./recentlySeen.types";

export const push = (item) => ({
  type: recentlySeenActionTypes.PUSH,
  payload: item,
});

// export const pop = () => ({
//   type: recentlySeenActionTypes.POP,
//   payload: null,
// });

export const clearRecentlySeenList = () => ({
  type: recentlySeenActionTypes.CLEAR,
});
