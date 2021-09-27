import React from 'react'
import { Dropdown } from 'primereact/dropdown'

const CardType = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="category">
                Card Type
            </label>
            <div className="p-inputgroup">
                <Dropdown
                    className=" p-jc-center"
                    name="category"
                    value={value}
                    id="category"
                    placeholder=" -- Select a category -- "
                />
            </div>
        </div>
    )
}

export default CardType
