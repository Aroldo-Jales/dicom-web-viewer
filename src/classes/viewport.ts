
import * as cornerstoneTools from "@cornerstonejs/tools";
import {

    ToolGroupManager,
    WindowLevelTool,
} from "@cornerstonejs/tools";
import { SetToolBindingsType } from "@cornerstonejs/tools/dist/esm/types";


export class CornerstoneTools {
    tools: typeof cornerstoneTools = cornerstoneTools


    toolGroup = ToolGroupManager.createToolGroup('STACK_TOOL_GROUP_ID');
    addTool(toolClass: any, toolConfiguration?: any, toolBindingsOption?: SetToolBindingsType) {
        this.tools.addTool(toolClass)
        this.toolGroup?.addTool(toolClass.toolName, toolConfiguration)
        this.toolGroup?.setToolActive(WindowLevelTool.toolName, toolBindingsOption);
    }

}
/* export class ViewPort {
    async renderStack() {
        // Init Cornerstone and related libraries
        await initDemo();

        // Add tools to Cornerstone3D
        cornerstoneTools.addTool(PanTool);
        cornerstoneTools.addTool(WindowLevelTool);
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ZoomTool);

        const toolGroupId = "STACK_TOOL_GROUP_ID";
        const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

        toolGroup?.addTool(WindowLevelTool.toolName);
        toolGroup?.addTool(PanTool.toolName);
        toolGroup?.addTool(ZoomTool.toolName);
        toolGroup?.addTool(StackScrollMouseWheelTool.toolName, { loop: true });

        toolGroup?.setToolActive(WindowLevelTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Primary, // Left Click
                },
            ],
        });
        toolGroup?.setToolActive(PanTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Auxiliary, // Middle Click
                },
            ],
        });
        toolGroup?.setToolActive(ZoomTool.toolName, {
            bindings: [
                {
                    mouseButton: MouseBindings.Secondary, // Right Click
                },
            ],
        });
        toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName);

        const { imageIds } = await createImageIdsAndCacheMetaData({
            StudyInstanceUID: "1.2.640.0.31017449.3.2.101.9.1454914.1230185",
            SeriesInstanceUID:
                "1.2.840.113619.2.507.7636706.3695232.30418.1697638227.900",
            wadoRsRoot: "http://localhost:8000/dicom-web",
        });

        const renderingEngineId = "myRenderingEngine";
        const renderingEngine = new RenderingEngine(renderingEngineId);

        // Create a stack viewport
        const viewportId = "CT_STACK";
        const viewportInput = {
            viewportId,
            type: ViewportType.STACK,
            element: elementRef.current,
        } as PublicViewportInput;

        renderingEngine.enableElement(viewportInput);

        // Set the tool group on the viewport
        toolGroup?.addViewport(viewportId, renderingEngineId);

        // Get the stack viewport that was created
        const viewport = renderingEngine.getViewport(
            viewportId
        ) as IStackViewport;

        // Define a stack containing a single image
        const stack = imageIds;

        // Set the stack on the viewport
        viewport.setStack(stack);

        // Render the image
        viewport.render();
    }
} */