import { InputText } from 'primereact/inputtext'
import React from 'react'

const Name = ({name,submitted,handleChange}) => {
    return (
        <div className="p-col-3">                      
                            <label  className='p-m-2 p-grid'>Name:<span className='star-color'>*</span></label>
                            <InputText name='name' 
                            className='p-mt-0 p-ml-2' value={name} 
                            onChange={handleChange} placeholder='Enter your name'  />
                            {/* {submitted && !name && <small className="p-error p-grid p-m-1 p-pl-2">Name is required</small>} */}
                        </div>
    )
}

export default Name
