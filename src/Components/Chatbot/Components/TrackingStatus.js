import React, { useEffect } from "react";
import { Timeline } from "primereact/timeline";

const TrackingStatus = ({ triggerNextStep }) => {
    useEffect(() => {
        triggerNextStep()
    }, [triggerNextStep])

    const datas = [
        {
            status: "Ordered",
            date: "15/10/2020 10:30",
        },
        {
            status: "Processing",
            date: "15/10/2020 14:00",
        },
        {
            status: "Shipped",
            date: "15/10/2020 16:15",
        },
        {
            status: "Delivered",
            date: "Not yet delivered",
        },
    ];

    return (
        <>
            <Timeline
                value={datas}
                align="alternate"
                opposite={(item) => <b style={{ color: '#2198D0' }}>{item.status}</b>}
                className="customized-timeline"
                content={(item) => <small className="p-text-secondary">{item.date}</small>}
            />
        </>
    );
};

export default TrackingStatus;