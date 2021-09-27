import { InputText } from 'primereact/inputtext'
import React from 'react'

const ModelClassMethod = ({modelClassMethod,submitted,handleChange}) => {
    return (
        <div className="p-col-3">                      
                            <label className='p-m-2 p-grid'>Model Class Method:</label>
                            <InputText name='modelClassMethod' 
                            className='p-mt-0 p-ml-2' value={modelClassMethod} 
                            onChange={handleChange} placeholder='Model class method'  />
                            {/* {submitted && !modelClassMethod && <small className="p-error p-grid p-m-1 p-pl-2">Class Method is required</small>} */}
                        </div>
    )
}

export default ModelClassMethod
