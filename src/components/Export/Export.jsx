import React, { useEffect, useState } from 'react';
import { ExportIcon } from '../../assets/Icons';

const Export = ({ data }) => {
    const [href, setHref] = useState('');

    useEffect(() => {
        if (data.length === 0) {
            setHref(`javascript:void(0)`);
        } else {
            setHref(`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`);
        }
    }, [data]);

    return (<>
        <a
            href={href}
            download="data.json"
        >
            <ExportIcon/>
        </a>
    </>);
}

export default Export