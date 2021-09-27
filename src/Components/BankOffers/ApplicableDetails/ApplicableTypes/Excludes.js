import React from 'react'
import { MultiSelect } from 'primereact/multiselect'

const Excludes = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="category">
                Excludes
            </label>
            <div className="p-inputgroup">
                <MultiSelect value={value}
                    name='include'
                    options={["data3", "data4"]}
                    placeholder="Select excludes"
                    display="chip" />
            </div>
        </div>
    )
}

export default Excludes
