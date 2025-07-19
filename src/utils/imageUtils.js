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

export const getContainedY = (y, imgHeight, containerHeight) => {
  const barHeight = Math.round((containerHeight - imgHeight) / 2);

  const topBarPos = barHeight;
  const bottomBarPos = barHeight + imgHeight;

  if (y < topBarPos || y > bottomBarPos) {
    return undefined;
  }

  return y - barHeight;
};

export const getContainedPos = (axis, imgDimension, containerDimension) => {
  const barLength = Math.round((containerDimension - imgDimension) / 2);

  const sideBarPos = barLength;
  const otherSideBarPos = barLength + imgDimension;

  if (axis < sideBarPos || axis > otherSideBarPos) {
    return undefined;
  }

  return axis - barLength;
};

export const getNaturalPosition = (containedPos, scale) => {
  const [containedX, containedY] = containedPos;

  const naturalX = containedX / scale;
  const naturalY = containedY / scale;

  return [naturalX, naturalY];
};

export const isInsideBox = ([selectedX, selectedY], box) => {
  const [x1, y1, x2, y2] = box;

  return (
    selectedX >= x1 && selectedX <= x2 && selectedY >= y1 && selectedY <= y2
  );
};
