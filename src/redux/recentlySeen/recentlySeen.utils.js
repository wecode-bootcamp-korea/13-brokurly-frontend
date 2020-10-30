export const addToList = (recentlySeenList, item) => {
  const check = recentlySeenList.some(
    (recentlyItem) => recentlyItem.id === item.id
  );
  return check ? recentlySeenList : [item, ...recentlySeenList];
};
