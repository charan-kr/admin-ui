import { Dropdown } from 'primereact/dropdown'
import React from 'react'

const Type = ({type,submitted,handleChange}) => {
    
    const types = ['SMS','Email','Notification']

    return (
        <div className='p-col-3'>
                            <label className='p-m-2 p-grid'>Type:</label>
                            <Dropdown value={type} name='type'  
                            options={types}  className=' placeholder-font-size dropdown-placeholder '
                            onChange={handleChange} placeholder='Enter the type' />
                            {submitted && !type && <small className="p-error p-grid p-m-1">Type is required</small>}
                        </div>
    )
}

export default Type
