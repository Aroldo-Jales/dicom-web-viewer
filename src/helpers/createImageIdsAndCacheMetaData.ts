import { api } from "dicomweb-client";
import dcmjs from "dcmjs";
import { calculateSUVScalingFactors } from "@cornerstonejs/calculate-suv";
import { getPTImageIdInstanceMetadata } from "./getPTImageIdInstanceMetadata";
import { utilities } from "@cornerstonejs/core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";

import ptScalingMetaDataProvider from "./ptScalingMetaDataProvider";
import getPixelSpacingInformation from "./getPixelSpacingInformation";
import { convertMultiframeImageIds } from "./convertMultiframeImageIds";

const { DicomMetaDictionary } = dcmjs.data;
const { calibratedPixelSpacingMetadataProvider } = utilities;


/**
/**
 * Uses dicomweb-client to fetch metadata of a study, cache it in cornerstone,
 * and return a list of imageIds for the frames.
 *
 * Uses the app config to choose which study to fetch, and which
 * dicom-web server to fetch it from.
 *
 */

interface CreateImageIdsAndCacheMetaDataProps {
  StudyInstanceUID: string,
  SeriesInstanceUID: string,
  wadoRsRoot: string,
}
export default async function createImageIdsAndCacheMetaData({
  StudyInstanceUID,
  SeriesInstanceUID,
  wadoRsRoot,
}: CreateImageIdsAndCacheMetaDataProps) {
  const SOP_INSTANCE_UID = "00080018";
  const SERIES_INSTANCE_UID = "0020000E";
  const MODALITY = "00080060";

  const studySearchOptions = {
    studyInstanceUID: StudyInstanceUID,
    seriesInstanceUID: SeriesInstanceUID,
  };

  const params = {
    url: wadoRsRoot,

    headers: { Authorization: "Basic " + btoa("test:test") },
  } as any
  const client = new api.DICOMwebClient(params);
  const instances = await client.retrieveSeriesMetadata(studySearchOptions);
  const modality = instances[0][MODALITY].Value[0];


  let imageIds = instances.map((instanceMetaData) => {
    const SeriesInstanceUID = instanceMetaData[SERIES_INSTANCE_UID].Value[0];
    const SOPInstanceUID = instanceMetaData[SOP_INSTANCE_UID].Value[0];

    const prefix = "wadors:";

    const imageId =
      prefix +
      wadoRsRoot +
      "/studies/" +
      StudyInstanceUID +
      "/series/" +
      SeriesInstanceUID +
      "/instances/" +
      SOPInstanceUID +
      "/frames/1";

    cornerstoneWADOImageLoader.wadors.metaDataManager.add(
      imageId,
      instanceMetaData
    );

    return imageId;
  });

  imageIds = convertMultiframeImageIds(imageIds);
  imageIds.forEach((imageId) => {
    let instanceMetaData =
      cornerstoneWADOImageLoader.wadors.metaDataManager.get(imageId);
    instanceMetaData = JSON.parse(JSON.stringify(instanceMetaData));
    if (instanceMetaData) {
      const metadata = DicomMetaDictionary.naturalizeDataset(instanceMetaData);
      const pixelSpacing = getPixelSpacingInformation(metadata);

      if (pixelSpacing) {
        calibratedPixelSpacingMetadataProvider.add(
          imageId,
          pixelSpacing.map((s) => parseFloat(s))
        );
      }
    }
  });


  if (modality === "PT") {
    const InstanceMetadataArray = [];
    imageIds.forEach((imageId) => {
      const instanceMetadata = getPTImageIdInstanceMetadata(imageId);


      if (typeof instanceMetadata.CorrectedImage === "string") {
        instanceMetadata.CorrectedImage =
          instanceMetadata.CorrectedImage.split("\\");
      }

      if (instanceMetadata) {
        InstanceMetadataArray.push(instanceMetadata);
      }
    });
    if (InstanceMetadataArray.length) {
      const suvScalingFactors = calculateSUVScalingFactors(
        InstanceMetadataArray
      );
      InstanceMetadataArray.forEach((instanceMetadata, index) => {
        ptScalingMetaDataProvider.addInstance(
          imageIds[index],
          suvScalingFactors[index]
        );
      });
    }
  }

  return {
    imageIds: imageIds,

  };
}
