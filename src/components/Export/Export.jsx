import React, { useEffect, useState } from 'react';
import { ExportIcon } from '../../assets/Icons';
import FileDownload from 'js-file-download'
import base64js from 'base64-js'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Export = ({ data }) => {

    
    const generatePDF = () => {

        if (data.length === 0) {
            return;
        }
        event.preventDefault();
        FileDownload(JSON.stringify(data, null, 2), 'data.json');

        const screenDiv = document.querySelector('#screenId');
        console.log("screenDiv", screenDiv)
        console.log("here screendiv: ", screenDiv)
        html2canvas(screenDiv)
            .then((canvas) => {
                console.log("here")
                // Convert the screenshot to a data URL
                const screenshotDataUrl = canvas.toDataURL('image/jpeg'); // You can adjust the format and quality as needed

                // Create a new instance of jsPDF
                const pdf = new jsPDF();

                // Add the screenshot to the PDF
                pdf.addImage(screenshotDataUrl, 'JPEG', 10, 10, 190, 120); // You can adjust the position and dimensions

                // Format your JSON data as needed and add it to the PDF
                // const formattedData = JSON.stringify(data, null, 2); // Pretty-printed JSON
                // pdf.text(10, 140, formattedData);

                // Generate the PDF content as a data URL
                const pdfContent = pdf.output('datauristring');

                // Create an invisible anchor element
                const anchor = document.createElement('a');
                anchor.style.display = 'none';
                anchor.href = pdfContent;
                anchor.download = 'data.pdf';

                // Append the anchor to the document body
                document.body.appendChild(anchor);

                // Simulate a click on the anchor to trigger the download
                anchor.click();

                // Remove the anchor from the document body
                document.body.removeChild(anchor);
            })
            .catch((error) => {
                console.error('Error capturing screenshot:', error);
            });
    };


    //     if (data.length === 0) {
    //         return;
    //     }
    //     // FileDownload(JSON.stringify(data, null, 2), 'data.json');
    //     const bannerDiv = document.querySelector('#screen');
    //     const canvas = await html2canvas(bannerDiv);
    //     console.log("canvas:",canvas)

    //     // Convert the screenshot to a data URL
    //     const screenshotDataUrl = canvas.toDataURL('image/jpeg');
    //     const pdf = new jsPDF();

    //     pdf.addImage(screenshotDataUrl, 'JPEG', 10, 10, 190, 120)

    //     // Format your JSON data as needed and add it to the PDF
    //     const formattedData = JSON.stringify(data, null, 2); // Pretty-printed JSON
    //     pdf.text(10, 10, formattedData);

    //     // Generate the PDF content as a data URL
    //     const pdfContent = pdf.output('datauristring');

    //     // Create an invisible anchor element
    //     const anchor = document.createElement('a');
    //     anchor.style.display = 'none';
    //     anchor.href = pdfContent;
    //     anchor.download = 'data.pdf';

    //     // Append the anchor to the document body
    //     document.body.appendChild(anchor);

    //     // Simulate a click on the anchor to trigger the download
    //     anchor.click();

    //     // Remove the anchor from the document body
    //     document.body.removeChild(anchor);

    // }

    // useEffect(() => {
    //     if (data.length === 0) {
    //         setHref(`javascript:void(0)`);
    //     } else {
    //         // setHref(`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
    //         // debugger

    //         // const pdfContent = "dadasdf";
    //         // // Create blobs for JSON and PDF datads
    //         // // const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });
    //         // const pdfBlob = new Blob([pdfContent], { type: 'application/pdf ' });

    //         // // Create a combined blob containing both JSON and PDF data
    //         // const combinedBlob = new Blob([ pdfBlob]);

    //         // // Create a data URL for the combined blob
    //         // const combinedHref = URL.createObjectURL(combinedBlob);

    //         // const anchor = document.createElement('a');
    //         // anchor.style.display = 'none';
    //         // anchor.href = combinedHref;
    //         // anchor.download = 'data.pdf';

    //         // // Append the anchor to the document body
    //         // document.body.appendChild(anchor);

    //         // // Simulate a click on the anchor to trigger the download
    //         // anchor.click();
    //         // anchor.remove(); 

    //         // Remove the anchor from the document body
    //         // document.body.removeChild(anchor);

    //         // setCombinedHref(combinedHref);
    //         // window.open(combinedHref, '_blank');
    //         // const byteData = 
    //         // const pdf = new jsPDF();
    //         // pdf.text(10, 10, JSON.stringify(data)); // You can format this as needed
    //         // const pdfDataUri = pdf.output('datauristring');
    //         // FileDownload(pdfDataUri, 'data.pdf');

    //     }
    // }, [data]);

    return (<>
        <a

            href="#"
            // download="data.json"
            onClick={() => { generatePDF() }}
        >
            <ExportIcon />
        </a>
    </>);
}

export default Export