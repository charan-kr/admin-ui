import React, { useEffect } from 'react'

const Error = ({ triggerNextStep, previousStep }) => {

    useEffect(() => {
        triggerNextStep()
    }, [triggerNextStep])

    return (
        <>
            {previousStep?.value === 'Something went wrong' ?
                (<div>
                    <span className='p-error'>
                        <h3>
                            <i className="pi pi-exclamation-triangle p-mr-2" style={{ fontSize: '25px' }} />
                            {previousStep?.value} <br />
                        </h3>
                    </span>
                    <h4>
                        Sorry for the inconvienience caused <br />
                        Our server did'nt respond!
                    </h4>

                </div>)
                :
                (<div>
                    <span className='p-error'>
                        <h3>
                            <i className="pi pi-exclamation-triangle p-mr-2" style={{ fontSize: '25px' }} />
                            Invalid id <br />
                        </h3>
                    </span>
                    <h4>Please enter a valid one <br />
                        For eg: Dxxxxxxxxxxxx45
                    </h4>
                </div>)

            }
        </>
    )
}

export default Error
