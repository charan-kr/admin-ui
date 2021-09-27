import { InputText } from 'primereact/inputtext'
import React from 'react'

const ModelClass = ({modelClass,submitted,handleChange}) => {
    return (
       <div className="p-col-3">                      
                            <label className='p-m-2 p-grid'>Model Class:</label>
                            <InputText name='modelClass' 
                            className='p-mt-0 p-ml-2' value={modelClass} 
                            onChange={handleChange} placeholder='Model class'  />
                            {/* {submitted && !modelClass && <small className="p-error p-grid p-m-1 p-pl-2">Model class is required</small>} */}
                        </div>
    )
}

export default ModelClass
