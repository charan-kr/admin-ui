import React from 'react'
import { InputText } from 'primereact/inputtext';

const ClassName = ({details,submitted,handleChange,update}) => {
    return (
        update ? ( 
                        <>                      
                            <label >Class Name:<span className='star-color'>*</span></label>
                            <InputText name='className' 
                            value={details.className} 
                            onChange={handleChange} placeholder='Enter your Class Name'  />
                            {submitted && !details.className && <small className="p-error p-grid p-m-1">Class Name is required</small>}
                        </>
        )
        : (
                        <div className="p-col-8">                      
                            <label className='p-m-2 p-grid'>Class Name:<span className='star-color'>*</span></label>
                            <InputText name='className' 
                            className='p-mt-0 p-ml-2' value={details.className} 
                            onChange={handleChange} placeholder='Enter your Class Name'  />
                            {submitted && !details.className && <small className="p-error p-grid p-m-1 p-pl-2">Class Name is required</small>}
                        </div>
        )
    )
}

export default ClassName
