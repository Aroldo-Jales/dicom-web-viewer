/* eslint-disable @typescript-eslint/no-explicit-any */
import { utilities as csUtils } from '@cornerstonejs/core';

const scalingPerImageId = {} as any;
type IScalingMetaData = any[]
function addInstance(imageId: any, scalingMetaData:IScalingMetaData) {
  const imageURI = csUtils.imageIdToURI(imageId);
  scalingPerImageId[imageURI] = scalingMetaData;
}

function get(type: any, imageId: any) {
  if (type === 'scalingModule') {
    const imageURI = csUtils.imageIdToURI(imageId);
    return scalingPerImageId[imageURI];
  }
}

export default { addInstance, get };
