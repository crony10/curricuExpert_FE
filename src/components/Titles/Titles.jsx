import { React, useState } from "react";
import titles from "./titles.css"
import Title from "./Title";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


function Titles({ list, setList, undoList, setUndo }) {

    const [higherStageItemIds, setHigherStageItemIds] = useState([]);

   

    function findHigherStageItems(sourceIndex, items, draggedStage, isDragOrDrop) {
        let higherStageItems = [];
        for (let i = sourceIndex + 1; i < items.length; i++) {
            if (items[i].stage > draggedStage) {
                if (isDragOrDrop === "onDrop") higherStageItems.push(items[i]);
                else if (isDragOrDrop === "onDrag") higherStageItems.push(items[i].id);
            } else {
                break;
            }
        }
        return higherStageItems;
    }


    const onDrop = (dropResult) => {
        setHigherStageItemIds(null)

        const { source, destination } = dropResult;

        if (!destination) return; // If there's no valid destination, do nothing

        const items = [...list]; // Copy the current list to avoid modifying it directly

        // Find the dragged item and it's stage
        const draggedItem = items[source.index];
        const draggedStage = draggedItem.stage;

        const receivingItem = items[destination.index];
        let newIndex = destination.index;

        // Return if parent node is dragged into it's children
        if ((higherStageItemIds.includes(receivingItem.id))) return;

        // Find the index where the dragged item should be placed

        let higherStageItems = findHigherStageItems(source.index, items, draggedStage, "onDrop");

        // First insert the dragged item at the new index
        items.splice(source.index, 1);
        items.splice(newIndex, 0, draggedItem);

        // And then Insert the higher stage items
        if (source.index < newIndex) { // If we are dragging from top to bottom of the list
            if (higherStageItems.length > 0) {
                items.splice(newIndex + 1, 0, ...higherStageItems);
                items.splice(source.index, higherStageItems.length);
            }
        }
        else { // If we are dragging from bottom to top of the list
            if (higherStageItems.length > 0) {
                items.splice(source.index + 1, higherStageItems.length);
                items.splice(newIndex + 1, 0, ...higherStageItems);
            }
        }

        setList(items)
    }

    const onDrag = (dragResult) => {
        const items = [...list];
        const draggedItem = items[dragResult.source.index];

        const draggedStage = draggedItem.stage;
        let higherStageItemIds = findHigherStageItems(dragResult.source.index, items, draggedStage, "onDrag");

        setHigherStageItemIds(higherStageItemIds);
    }

  


    return (
        <>


            <DragDropContext onDragEnd={onDrop} onDragStart={onDrag}>
                <Droppable
                    droppableId="list"
                >
                    {(provided) => (
                        <div
                            className="list"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {list?.map((node, index) => {
                                return (

                                    <Draggable
                                        key={node.id}
                                        draggableId={node.id}
                                        index={index}
                                        isDragDisabled={higherStageItemIds?.includes(node.id)}
                                    >
                                        {(provided) => (

                                            <Title
                                                node={node}
                                                provided={provided}
                                                index={index}
                                                setList={setList}
                                                list={list}
                                                higherStageItemIds={higherStageItemIds}
                                                undoList={undoList}
                                                setUndo={setUndo}
                                      
                                                // updationList={updationList}
                                            />

                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            
        </>
    )
}

export default Titles; 