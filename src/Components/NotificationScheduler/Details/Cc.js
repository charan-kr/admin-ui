import { InputText } from 'primereact/inputtext'
import React from 'react'

const Cc = ({cc,submitted,handleChange}) => {
    return (
       <div className="p-col-3">                      
                            <label className='p-m-2 p-grid'>Cc:</label>
                            <InputText name='cc' 
                            className='p-mt-0 p-ml-2' value={cc} 
                            onChange={handleChange} placeholder='Type here'  />
                            {/* {submitted && !cc && <small className="p-error p-grid p-m-1 p-pl-2">Cc is required</small>} */}
                        </div>
    )
}

export default Cc
