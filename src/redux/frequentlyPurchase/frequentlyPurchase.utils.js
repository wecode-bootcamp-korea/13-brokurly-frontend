export const checkFrequentlyPurchaseItem = (frequentlyPurchaseList, item) => {
  const check = frequentlyPurchaseList.some(
    (frequentlyPurchaseItem) =>
      frequentlyPurchaseItem.product_id === item.product_id
  );

  return check ? frequentlyPurchaseList : [...frequentlyPurchaseList, item];
};
