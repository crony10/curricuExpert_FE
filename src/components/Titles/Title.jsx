import { useEffect, useState } from "react";
import { DeleteIcon, DuplicateIcon, LeftArrowIcon, MoveIcon, RightArrowIcon } from "../../assets/Icons";
import { Tooltip } from 'react-tooltip'

import Node from "../../utils/node";

const DEFAULT_MARGIN = 25;
const Title = ({
    node,
    provided,
    index,
    list,
    setList,
    higherStageItemIds,
    undoList,
    setUndo
}) => {
    console.log("list in title: ",list)

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonText = isHovered ? 'Duplicate' : '';

    function findHigherStageItems(sourceIndex, items, currentStage, isForDuplicate, isIncrement) {
        // debugger
        let higherStageItems = [];
        for (let i = sourceIndex + 1; i < items.length; i++) {
            if (items[i].stage > currentStage) {
                let higherNode = new Node;
                if (isForDuplicate) {
                    higherNode = { ...higherNode, title: items[i].title, stage: items[i].stage };
                }
                else higherNode = items[i];

                if (!isForDuplicate && higherNode.stage > 0) {
                    isIncrement ? higherNode.stage += 1 : higherNode.stage -= 1;
                }
                higherStageItems.push(higherNode)
            } else {
                break;
            }
        }
        return higherStageItems;
    }

    useEffect(() => {
        console.log("node.id: ", node.id)
    }, [])

    const getDynamicMargin = (nodeStage) => {
        return {
            marginLeft: DEFAULT_MARGIN * nodeStage + "px",
        };
    };

    const getTitleColor = (node) => {
        if (node.stage === 0) {
            return { color: `rgb(0, 198, 204)` };
        } else if (node.stage === 1) {
            return { color: 'black' };
        } else {
            return { color: 'grey' };
        }
    };

    const increaseStages = (node, index) => {
        console.log("index: in: ", index)
        console.log("node is now: ", node);


        // debugger
        console.log("list : ", list)
        const copyList = JSON.parse(JSON.stringify(list));
        setUndo(copyList)


        // debugger
        const previousIndex = index - 1;
        const parentNode = list[previousIndex]
        console.log("parentNod:", parentNode)
        if ((previousIndex >= 0 && parentNode.stage >= node.stage)) {
            if (node.stage >= 0) {
                const originalStage = node.stage
                node.stage += 1;
                const higherStageItems = findHigherStageItems(index, list, originalStage, 0, 1);
                console.log("higherStageItems: ", higherStageItems)
                setList([...list])
            }
        }
        // this code is for incrementing the first node
        // else if (previousIndex < 0) {
        //     if (node.stage >= 0) {
        //         const originalStage = node.stage
        //         node.stage += 1;
        //         const higherStageItems = findHigherStageItems(index, list, originalStage, 0, 1);
        //         console.log("higherStageItems: ", higherStageItems)
        //         setList([...list])
        //     }
        // }

    }

    const decreaseStages = (node, index) => {
        const copyList = JSON.parse(JSON.stringify(list));
        setUndo(copyList)
        if (node.stage > 0) {
            const originalStage = node.stage
            node.stage -= 1;
            const higherStageItems = findHigherStageItems(index, list, originalStage, 0, 0);
            console.log("higherStageItems: ", higherStageItems)
            setList([...list])
        }

        // if (node.stage > 0) {
        //     node.stage -= 1;
        //     setList([...list])
        // }


        // const previousIndex = index - 1;
        // const parentNode = list[previousIndex]
        // const parentNode = list[index - 1]
        // console.log("parentNod:", parentNode)
        // debugger
        // if ((previousIndex > 0 && parentNode.stage <= node.stage)) {
        //     if (node.stage > 0) {
        //         const originalStage = node.stage
        //         node.stage -= 1;
        //         const higherStageItems = findHigherStageItems(index, list, originalStage, 0, 0);
        //         console.log("higherStageItems: ", higherStageItems)
        //         setList([...list])
        //     }
        // }
        // else  if(previousIndex<0){
        //     if (node.stage > 0) {
        //         const originalStage = node.stage
        //         node.stage -= 1;
        //         const higherStageItems = findHigherStageItems(index, list, originalStage, 0, 0);
        //         console.log("higherStageItems: ", higherStageItems)
        //         setList([...list])
        //     }
        // }


    }

    const onUpdate = (text, selectedNode) => {
        const copyList = JSON.parse(JSON.stringify(list));
        setUndo(copyList)
        selectedNode.title = text;
        setList([...list])
    }

    const deleteNode = (node, index) => {
        const copyList = JSON.parse(JSON.stringify(list));
        setUndo(copyList)
        console.log("index of deleting node: ", index)

        const items = [...list];
        const draggedItem = items[index];

        let higherStageItemIds = [];

        const draggedStage = draggedItem.stage;
        for (let i = index + 1; i < items.length; i++) {
            if (items[i].stage > draggedStage) {
                higherStageItemIds.push(items[i].id);
            } else {
                break;
            }
        }

        console.log("higerStageitems in delete: ", higherStageItemIds)

        console.log("index of deleting node: ", index);

        // Filter out the selected item and items in higherStageItemIds
        const updatedList = list.filter((item) => {
            return item.id !== draggedItem.id && !higherStageItemIds.includes(item.id);
        });

        // Update the list state with the new filtered list
        setList(updatedList);
    }

    const duplicateNode = (node, index) => {
        const copyList = JSON.parse(JSON.stringify(list));
        setUndo(copyList)
        // console.log("list: ", list)
        // console.log("node: ", node)
        // console.log("index: ", index)

        // const clonedNode = node;
        // list[index + 1] = clonedNode;

        let clonedNode = new Node;
        clonedNode = { ...clonedNode, title: node.title, stage: node.stage };
        // console.log("clonedNode: ", clonedNode)

        const higherStageItems = findHigherStageItems(index, list, node.stage, 1, 0);

        // console.log("higherStageitems: ", higherStageItems)


        //The combination of these two slice calls is used to split the list into three parts:
        // Elements before the specified index (0 to index + higherStageItems.length).
        // The clonedNode (the duplicated node).
        // Elements after the specified index (index + higherStageItems.length + 1 to the end of the array).
        const updatedList = [
            ...list.slice(0, index + higherStageItems.length + 1), // Spread elements before the index
            clonedNode,
            ...higherStageItems,
            ...list.slice(index + higherStageItems.length + 1) // Spread elements after the index
        ];

        setList([...updatedList])
        // setList[...list]
    }


    return (
        <div
            className={`${higherStageItemIds?.includes(node.id) ? "row-dragging" : "row"}`}
            {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
        >
            <div data-tooltip-id="move-tooltip"
                data-tooltip-content="Move"
                data-tooltip-place="bottom">
                <Tooltip id="move-tooltip" />
                <MoveIcon />
            </div>


            <div
                onClick={() => decreaseStages(node, index)}
                style={{ cursor: 'pointer' }}
                data-tooltip-id="left-tooltip"
                data-tooltip-content="Outdent"
                data-tooltip-place="bottom">
                <Tooltip id="left-tooltip" />
                <LeftArrowIcon />

            </div>



            <div
                onClick={() => increaseStages(node, index)}
                style={{ cursor: 'pointer' }}
                data-tooltip-id="right-tooltip"
                data-tooltip-content="Indent"
                data-tooltip-place="bottom">
                <Tooltip id="right-tooltip" />
                <RightArrowIcon />

            </div>



            <div
                onClick={() => deleteNode(node, index)}
                style={{ cursor: 'pointer' }}
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Delete"
                data-tooltip-place="bottom">
                <Tooltip id="delete-tooltip" />
                <DeleteIcon />

            </div>


            {/* <button onClick={() => duplicateNode(node, index)} style={{ cursor: 'pointer' }}>

                Duplicate
            </button> */}

            <button
                onClick={() => duplicateNode(node, index)}
                style={{ cursor: 'pointer' }}
                data-tooltip-id="duplicate-tooltip"
                data-tooltip-content="Duplicate"
                data-tooltip-place="bottom">
                <Tooltip id="duplicate-tooltip" />
                <DuplicateIcon />
                {/* Duplicate */}
            </button>


            <div className="content-wrapper" style={getDynamicMargin(node.stage)}>
                <span className="arrow">-</span>
                <input
                    className="text-input"
                    type="text"
                    placeholder="Enter the Standard here"
                    value={(node?.title)}
                    onChange={(e) => { onUpdate(e.target.value, node) }}
                    style={getTitleColor(node)}
                />
            </div>
        </div>
    );
}

export default Title;