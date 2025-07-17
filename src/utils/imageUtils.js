export const getContainedSize = (img) => {
  let { width, height, naturalWidth, naturalHeight } = img;
  let iAR = naturalWidth / naturalHeight;
  let ctAR = width / height;
  let [containedWidth, containedHeight] =
    iAR >= ctAR ? [width, width / iAR] : [height * iAR, height];
  let scale = containedWidth / naturalWidth;
  return { containedWidth, containedHeight, scale };
};

export const getContainedX = (x, imgWidth, containerWidth) => {
  const barWidth = Math.round((containerWidth - imgWidth) / 2);

  const leftBarPos = barWidth;
  const rightBarPos = barWidth + imgWidth;

  if (x < leftBarPos || x > rightBarPos) {
    return undefined;
  }

  return x - barWidth;
};

export const getNaturalPosition = (containedPos, scale) => {
  const [containedX, containedY] = containedPos;

  const naturalX = containedX / scale;
  const naturalY = containedY / scale;

  return [naturalX, naturalY];
};
