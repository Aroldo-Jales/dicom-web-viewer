/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@cornerstonejs/dicom-image-loader';
declare module 'cornerstone-wado-image-loader';
declare module 'dcmjs';

declare module '../helpers/convertMultiframeImageIds' {
  // Define the types for the module
  // For example:
  export function someFunction(arg: string): number;
}
interface Window {
  cornerstone: any;
  cornerstoneTools: any;
}
