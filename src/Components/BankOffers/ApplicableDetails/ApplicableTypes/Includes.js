import React from 'react'
import { MultiSelect } from 'primereact/multiselect'

const Includes = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="category">
                Includes <span className="p-error">*</span>
            </label>
            <div className="p-inputgroup">
                <MultiSelect value={value}
                    name='exclude'
                    options={["Books", "Fashion"]}
                    placeholder="Select includes"
                    display="chip" />
            </div>
        </div>
    )
}

export default Includes
