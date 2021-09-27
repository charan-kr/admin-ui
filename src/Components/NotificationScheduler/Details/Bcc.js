import { InputText } from 'primereact/inputtext'
import React from 'react'

const Bcc = ({bcc,submitted,handleChange}) => {
    return (
        <div className="p-col-3">                      
                            <label  className='p-m-2 p-grid'>Bcc:</label>
                            <InputText name='bcc' 
                            className='p-mt-0 p-ml-2' value={bcc} 
                            onChange={handleChange} placeholder='Type here'  />
                            {/* {submitted && !bcc && <small className="p-error p-grid p-m-1 p-pl-2">Bcc is required</small>} */}
                        </div>
    )
}

export default Bcc
