import React, { useState } from "react"
import styles from "./styles.css"
import Node from "../../utils/node"
import Titles from "../../components/Titles/Titles";
import Export from "../../components/Export/Export";
import Import from "../../components/Import/Import";
import { RedoIcon, UndoIcon } from "../../assets/Icons";
import { Tooltip } from 'react-tooltip'

const BASE_STAGE = 0;
function Dashboard() {

  const [list, setList] = useState([]);
  const [subject, setSubject] = useState();

  const [undoList, setUndoList] = useState([]);
  const [redoList, setRedoList] = useState([]);
  // const [undoList,setUndo] = useState([]);

  // const [prevList,setPrevList] = useState(); 

  const addAssignment = () => {


    const node = new Node();

    const tempList = JSON.parse(JSON.stringify(list));;
    setUndoList([...undoList, tempList]);
    node.stage = BASE_STAGE;

    setRedoList([])

    setList([...list, node])
    // console.log("undoList: ", undoList)
  }

  const setUndo = (tempList) => {
    // console.log("tempList: ", tempList)
    // console.log("undoList before updation: ", undoList)

    setUndoList([...undoList, tempList]);
    // console.log("undoList: ", undoList)
  }

  console.log("redoList: ", redoList)
  console.log("undoList: ", undoList)
  const undoClicked = () => {
    // const currentList = JSON.parse(JSON.stringify(list));
    // setRedoList([...redoList, currentList]);
    const lastUndoState = undoList.pop();
    if (lastUndoState) {
      setList(lastUndoState)
      const currentList = JSON.parse(JSON.stringify(list));
      setRedoList([...redoList, currentList]);
    }
  }

  const redoClicked = () => {
    // console.log("redoElem: ", redoElemArray);
    const redoElemArray = redoList.pop();
    if (redoElemArray) {
      setList(redoElemArray);
      // setUndoList([...undoList, list])
      const tempList = JSON.parse(JSON.stringify(list));;
      setUndoList([...undoList, tempList]);
    }
  }
  // const bannerDiv = document.querySelector('#screenId');

  // console.log("list is: ", list)
  // console.log("screen:  ", bannerDiv)

  return (
    <>
      <div className="screen" id="screenId">

        <div
          className="banner"
          id="banner">
          <h1>CurricuExpert</h1>
        </div>

        <div style={{ margin: '0px 33px' }}>
          {/* import export buttons */}
          <div className="iebuttons">
            <div
              data-tooltip-id="export-tooltip"
              data-tooltip-content="Download"
              data-tooltip-place="top">
              <Tooltip id="export-tooltip" />

              <Export data={list} />
            </div>

            <div
              data-tooltip-id="import-tooltip"
              data-tooltip-content="Upload"
              data-tooltip-place="top">
              <Tooltip id="import-tooltip" />


              <Import setList={setList} />
            </div>
          </div>


          {/* Header */}
          <div>

            <input className="header" type="text" value={subject} placeholder="Enter a Subject" onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="subHeaderWrapper">
            <div style={{ marginRight: '10rem' }}>
              <b>Actions</b>
              <div >
                Move, Indent,<br /> Outdent, Delete
              </div>
            </div>
            <div>
              <b>Standard</b>
              <div className="subHeader">The text of the standard</div>
            </div>
          </div>


          {/* Rows List */}
          <Titles
            list={list}
            setList={setList}
            undoList={undoList}
            setUndo={setUndo}

          />


          {/* Button */}
          <button className="button" onClick={addAssignment}>
            Add a standard
          </button>

          {/* <button onClick={undoClicked}>
          Undo
        </button> */}

          {/* <button onClick={redoClicked}>
          Redo
        </button> */}

          <span
            onClick={() => undoClicked()}
            style={{ cursor: 'pointer' }}
            data-tooltip-id="undo-tooltip"
            data-tooltip-content="Undo"
            data-tooltip-place="bottom">
            <Tooltip id="undo-tooltip" />
            <UndoIcon />
          </span>
          <span
            onClick={() => redoClicked()}
            style={{ cursor: 'pointer' }}
            data-tooltip-id="redo-tooltip"
            data-tooltip-content="Redo"
            data-tooltip-place="bottom">
            <RedoIcon />
            <Tooltip id="redo-tooltip" />
          </span>



        </div>
      </div>
    </>
  )
}

export default Dashboard
