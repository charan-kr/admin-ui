import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductService from '../Service/ProductService'
import Error from './Error';

const ProductCheck = ({ previousStep, step, triggerNextStep }) => {
    useEffect(() => {
        triggerNext()
    }, [])

    const productService = new ProductService()

    const triggerNext = () => {
        productService.getProductByWebId(previousStep.value).then((res) => {
            if (res.data.status === 'PARTIAL') {
                const obj = {
                    value: 'invalid',
                    trigger: 'invalid-id'
                }
                triggerNextStep(obj)
            }
            else {
                const obj = {
                    value: res.data.payload,
                    trigger: step.trigger
                }
                triggerNextStep(obj)
            }
        })
            .catch(() => {
                const obj = {
                    value: "Something went wrong",
                    trigger: 'id-invalid'
                }
                triggerNextStep(obj)
            })
    }

    return (
        <div>
            <i className='fa fa-search-plus' />&nbsp;
            Searching Product id <b>{previousStep?.value}</b><br />
        </div>
    )
}

//<---------I want to make prop-types for all component. so, after making to all I'll uncomment this one!------------->//
// ProductCheck.propTypes = {
//     previousStep: PropTypes.object,
//     triggerNextStep: PropTypes.func,
// };

// ProductCheck.defaultProps = {
//     previousStep: undefined,
//     triggerNextStep: undefined,
// };

export default ProductCheck

