import React, { useEffect, useState } from 'react'
import { Rating } from 'primereact/rating';
import logo from '../../../static/media/images/logo_5_wo_bg.png';
import './feedback.css'

const Feedback = ({ triggerNextStep, closeChat }) => {
    const [rating, setRating] = useState(null)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if (rating) {
            setTimeout(() => {
                triggerNextStep()
            }, 2000);
        };
    }, [rating, triggerNextStep]);

    const handleRating = (e) => {
        setSubmit(true)
        setRating(e.value)
        setTimeout(() => {
            closeChat()
        }, 500);
    }

    return (
        <div>
            <span className='p-text-center'>
                <img className='p-ml-4' src={logo} alt="logo" style={{ height: '50px', width: '150px' }} />
            </span>
            <div className='rating p-mt-4'>
                <Rating value={rating}
                    className='stars'
                    cancel={false}
                    onChange={handleRating} />
            </div>
            {submit && rating && <small style={{ color: '#2198D0' }}>{`Thanks for your rating :)`}</small>}
        </div>
    )
}

export default Feedback
