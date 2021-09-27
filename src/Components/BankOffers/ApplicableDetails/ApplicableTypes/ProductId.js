import { MultiSelect } from 'primereact/multiselect'
import React from 'react'

const ProductId = ({ option }) => {
    return (
        <div className="p-field">
            <label htmlFor="productId">Product</label>
            <div className="p-inputgroup">
                <MultiSelect
                    disabled
                    name="product"
                    placeholder=" -- Select a product -- "
                    options={option}
                />
            </div>

        </div>
    )
}

export default ProductId
