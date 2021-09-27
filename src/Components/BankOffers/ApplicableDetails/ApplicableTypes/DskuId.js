import { MultiSelect } from 'primereact/multiselect'
import React from 'react'

const DskuId = ({ option }) => {
    return (
        <div className="p-field">
            <label htmlFor="dsku">DSKU</label>
            <div className="p-inputgroup">
                <MultiSelect
                    name="dsku"
                    disabled
                    placeholder=" -- Select a dsku's -- "
                    filter
                    options={option}
                />
            </div>

        </div>
    )
}

export default DskuId
