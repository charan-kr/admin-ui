import React from 'react'
import { InputText } from 'primereact/inputtext';

const MethodName = ({details,submitted,handleChange,update}) => {
    return (
        update ? (
                        <> 
                            <label >Method Name:<span className='star-color'>*</span></label>
                            <InputText name='methodName' 
                            value={details.methodName} 
                            onChange={handleChange} placeholder='Enter your Method Name'  />
                            {submitted && !details.methodName && <small className="p-error p-grid p-m-1">Method Name is required</small>}
                        </>
         )
         : (
                        <div className="p-col-5"> 
                            <label className='p-m-2 p-grid' >Method Name:<span className='star-color'>*</span></label>
                            <InputText name='methodName' 
                            className='p-mt-0 p-ml-2' value={details.methodName} 
                            onChange={handleChange} placeholder='Enter your Method Name'  />
                            {submitted && !details.methodName && <small className="p-error p-grid p-m-1 p-pl-2">Method Name is required</small>}
                        </div>
         )
    )
}

export default MethodName
