import { useRef, useEffect } from "react";

import useCornnerstoneVolume from "../volume";
import { DicomImageRequestProps } from "../classes/request_dicom";

export function Volume({serieId, studyId}: DicomImageRequestProps) {
  const isInitialized = useRef<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { run } = useCornnerstoneVolume()

  useEffect(() => {

    if (!isInitialized.current) {
      run({serieId, studyId})

      isInitialized.current = true;
    }
  }, []);

  return (
    <div id="content" ref={elementRef}>

    </div>
  );
}
