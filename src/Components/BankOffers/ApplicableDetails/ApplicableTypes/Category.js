import React from 'react'
import { MultiSelect } from 'primereact/multiselect'

const Category = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="category">
                Category
            </label>
            <div className="p-inputgroup">
                <MultiSelect value={value}
                    name='exclude'
                    options={["Books", "Fashion"]}
                    placeholder=" -- Select a category -- "
                    display="chip" />
            </div>
        </div>
    )
}

export default Category
