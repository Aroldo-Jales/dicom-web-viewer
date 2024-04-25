import { createImageIdsAndCacheMetaData } from "../helpers";
export interface DicomImageRequestProps {
    studyId: string
    serieId: string
}

export class RequestDicom {

    async get(requestProps: DicomImageRequestProps) {
        const { imageIds } = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: requestProps.studyId,
            SeriesInstanceUID:
                requestProps.serieId,
            wadoRsRoot: "http://localhost:8000/dicom-web",
        });
        return imageIds;
    }
}