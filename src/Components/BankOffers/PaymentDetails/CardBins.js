import React from 'react'
import { Dropdown } from 'primereact/dropdown'

const CardBins = ({ value }) => {
    return (
        <div className="p-field">
            <label htmlFor="category">
                Card Bins
            </label>
            <div className="p-inputgroup">
                <Dropdown
                    className=" p-jc-center"
                    value={value}
                    name="category"
                    id="category"
                    placeholder=" -- Select a category -- "
                />
            </div>
        </div>
    )
}

export default CardBins
