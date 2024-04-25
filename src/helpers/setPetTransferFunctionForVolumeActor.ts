/* eslint-disable @typescript-eslint/no-explicit-any */
import { utilities } from '@cornerstonejs/core';

export default function setPetTransferFunction({ volumeActor }: any) {
  const rgbTransferFunction = volumeActor
    .getProperty()
    .getRGBTransferFunction(0);

  rgbTransferFunction.setRange(0, 5);

  utilities.invertRgbTransferFunction(rgbTransferFunction);
}
