import { MultiSelect } from 'primereact/multiselect'
import React from 'react'

const DvnId = ({ option }) => {
    return (
        <div className="p-field">
            <label htmlFor="dvn">DVN</label>

            <div className="p-inputgroup">
                <MultiSelect
                    disabled
                    name="dvn"
                    placeholder=" -- Select a DVN -- "
                    options={option}
                />
            </div>
        </div>
    )
}

export default DvnId
