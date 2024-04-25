

import { useRef, useEffect } from "react";
import {
  initDemo,
  createImageIdsAndCacheMetaData,
} from "../helpers";
import { ViewportType } from "@cornerstonejs/core/dist/esm/enums";
import {
  IStackViewport,
  PublicViewportInput,
} from "@cornerstonejs/core/dist/esm/types";
import {

  WindowLevelTool,
} from "@cornerstonejs/tools";
import { CornerstoneTools } from "../classes/viewport";
import { MouseBindings } from "@cornerstonejs/tools/dist/esm/enums";
import { DicomImageRequestProps, RequestDicom } from "../classes/request_dicom";
import { RenderingEngine } from "@cornerstonejs/core";


interface StackBasicProps {
  id: string,
  data: DicomImageRequestProps
}
export function StackBasic({ data, id }: StackBasicProps) {
  const isInitialized = useRef<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  async function renderStack() {
    await initDemo()
    const requestDicom = new RequestDicom()
    const renderingEngine = new RenderingEngine(id);
    const tools = new CornerstoneTools()
    


    const viewportId = id;
    const viewportInput = {
      viewportId,
      type: ViewportType.STACK,
      element: elementRef.current,
    } as PublicViewportInput;




    tools.toolGroup?.addViewport(viewportId, renderingEngine.id);


    renderingEngine.enableElement(viewportInput);


    const viewport = renderingEngine.getViewport(
      viewportId
    ) as IStackViewport;

    const stack = await requestDicom.get(data);

    viewport.setStack(stack);

    viewport.render();
  }
  useEffect(() => {

    if (!isInitialized.current) {
      renderStack()
      isInitialized.current = true;
    }
  }, []);

  return (
    <div >
      <div
        id="cornerstone-element"
        ref={elementRef}
        style={{ width: 200, height: 200 }}
      ></div>
    </div>
  );
}
