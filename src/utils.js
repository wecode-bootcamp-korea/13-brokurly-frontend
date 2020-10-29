export const RESIZE_IMAGE = (e, that) => {
  const sizeCheck = e.target.naturalWidth >= e.target.naturalHeight;
  that.setState({ isWidthBiggerThanHeight: sizeCheck });
};
