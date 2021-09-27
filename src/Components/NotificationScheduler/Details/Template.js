import { InputText } from 'primereact/inputtext'
import React from 'react'

const Template = ({template,submitted,handleChange}) => {
    return (
        <div className="p-col-3">                      
                            <label className='p-m-2 p-grid'>Template:</label>
                            <InputText name='template' 
                            className='p-mt-0 p-ml-2' value={template} 
                            onChange={handleChange} placeholder='Enter the Template'  />
                            {/* {submitted && !template && <small className="p-error p-grid p-m-1 p-pl-2">Template is required</small>} */}
                        </div>
    )
}

export default Template
