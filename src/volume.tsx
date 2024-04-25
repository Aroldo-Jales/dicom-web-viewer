/* eslint-disable @typescript-eslint/no-explicit-any */
import * as cornerstoneTools from "@cornerstonejs/tools";
import { RenderingEngine, Enums, volumeLoader } from "@cornerstonejs/core";
import { createImageIdsAndCacheMetaData, initDemo } from "../src/helpers";
import { IVolumeViewport } from "@cornerstonejs/core/dist/esm/types";
import { DicomImageRequestProps } from "./classes/request_dicom";


const {
    PanTool,
    WindowLevelTool,
    StackScrollMouseWheelTool,
    ZoomTool,
    ToolGroupManager,
    Enums: csToolsEnums,
} = cornerstoneTools;

const { ViewportType } = Enums;
const { MouseBindings } = csToolsEnums;
const toolGroupId = "myToolGroup";

export default function useCornnerstoneVolume() {


    const volumeName = 'PROSTATE_VOLUME'; // Id of the volume less loader prefix
    const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use
    const volumeId = `${volumeLoaderScheme}:${volumeName}`; // VolumeId with loader id + volume id

    // ======



    const run = async ({serieId, studyId}: DicomImageRequestProps) => {
        const content = document.getElementById("content");

        const element = document.createElement("div");
        element.oncontextmenu = (e) => e.preventDefault();
        element.id = "cornerstone-element";
        element.style.width = '500px';
        element.style.height = '500px';

        content!.appendChild(element);
        // Init Cornerstone and related libraries
        await initDemo();

        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);

        
        const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)!;

        // Add tools to the tool group
        toolGroup.addTool(WindowLevelTool.toolName);
        toolGroup.addTool(PanTool.toolName);
        toolGroup.addTool(ZoomTool.toolName);
        toolGroup.addTool(StackScrollMouseWheelTool.toolName);


        toolGroup.setToolActive(WindowLevelTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });
        toolGroup.setToolActive(PanTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Auxiliary, // Middle Click
                },
            ],
        });
        toolGroup.setToolActive(ZoomTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Secondary, // Right Click
                },
            ],
        });
       
        toolGroup.setToolActive(StackScrollMouseWheelTool.toolName)


        const renderingEngineId = "myRenderingEngine";
        const renderingEngine = new RenderingEngine(renderingEngineId);

        // Create a stack viewport
        const viewportId = "CT_STACK";
        const viewportInput = {
            viewportId,
            type: ViewportType.ORTHOGRAPHIC,
            element: element!,
            defaultOptions: {
                orientation: Enums.OrientationAxis.SAGITTAL,

                background: [250, 0, 0.0] as [number, number, number],
            },
        };

        renderingEngine.enableElement(viewportInput);


        const viewport = (
            renderingEngine.getViewport(viewportId)
        ) as IVolumeViewport;

       

        const { imageIds } = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: studyId,
            SeriesInstanceUID:
              serieId,
            wadoRsRoot: "http://localhost:8000/dicom-web",
        });



        console.log('imageIds', imageIds)

        const volume = await volumeLoader.createAndCacheVolume(volumeId, {
            imageIds: imageIds
        });

        volume.load();

   
        viewport.setVolumes([{ volumeId }]);

        viewport.render();

    };

    return {
        run,
    };
}
