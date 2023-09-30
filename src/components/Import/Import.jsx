import React, { useRef } from 'react';
import { ImportIcon } from '../../assets/Icons';


const Import = ({ setList }) => {
    const inputRef = useRef(null);

    const openFileSelector = () => {
        console.log("here")
        inputRef.current.click();
    }

    const importFile = (event) => {
        const files = event?.target?.files;

        if (!files.length) {
            return;
        }

        const file = files[0];
        getFileContent(file).then((content) => {
            let parsedData = JSON.parse(content);
            setList(parsedData)
        });
    }

    const getFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            }

            reader.onerror = (event) => {
                reject(event.target.error);
            }

            reader.readAsText(file);
        })
    }

    return (<>
        <input
            type="file"
            accept="text/json"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={importFile}
        />
        {/* <button
        onClick={openFileSelector}>
            asdasdf
        </button> */}
        <ImportIcon onClick={openFileSelector}/>
    </>);
}


export default Import;