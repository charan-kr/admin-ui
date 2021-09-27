import { InputText } from 'primereact/inputtext'
import React from 'react'

const To = ({to,submitted,handleChange}) => {
    return (
        <div className="p-col-3">                      
                            <label className='p-m-2 p-grid'>To:<span className='star-color'>*</span></label>
                            <InputText name='to' 
                            className='p-mt-0 p-ml-2' value={to} 
                            onChange={handleChange} placeholder='Type here'  />
                            {submitted && !to && <small className="p-error p-grid p-m-1 p-pl-2">Class Name is required</small>}
                        </div>
    )
}

export default To
