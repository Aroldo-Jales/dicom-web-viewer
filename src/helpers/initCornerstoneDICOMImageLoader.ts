import dicomParser from 'dicom-parser'
import * as cornerstone from '@cornerstonejs/core'

import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'

// window.cornerstone = cornerstone
// window.cornerstoneTools = cornerstoneTools

export default function initCornerstoneWADOImageLoader() {
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser
  cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false,
    },
    beforeSend: function (xhr: any) {
      // Add custom headers here (e.g. Authorization). Visit tutorial https://groups.google.com/g/orthanc-users/c/-a_qgYFzddU
      // the credentials are in tools\orthanc\orthanc.json, under "RegisteredUsers" field which is required for basic access authentication
      xhr.setRequestHeader('Authorization', 'Basic ' + btoa('test:test'))
    },
  })

  let maxWebWorkers = 1

  if (navigator.hardwareConcurrency) {
    maxWebWorkers = Math.min(navigator.hardwareConcurrency, 7)
  }

  const config = {
    maxWebWorkers,
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        strict: false,
      },
    },
  }

  cornerstoneWADOImageLoader.webWorkerManager.initialize(config)
}
