import React from 'react'
import { MultiSelect } from 'primereact/multiselect'


const SubCategory = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="subCategory">
                Sub Category
            </label>
            <div className="p-inputgroup">
                <MultiSelect value={value}
                    disabled
                    name='exclude'
                    options={["Books", "Fashion"]}
                    placeholder=" -- Select a subCategory -- "
                    display="chip" />
            </div>
        </div>
    )
}

export default SubCategory
