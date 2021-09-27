import React from 'react'
import { Dropdown } from 'primereact/dropdown';

const Type = ({details,submitted,handleChange,update,allPersonalization}) => {

    const category = ["Trending products","Blockbuster deals","Bank offers","Same day shipping","Popular brandsall",
    "Buy 1 get 50%off in 2nd items","Buy 1 get 1 free","Best deal of the day","Top discount items","New arrivals",
    "Promotional deals","Shipping free items","Top deals","Seasonal deals","Best sellers products"]
    
    const typeData =  allPersonalization?.map(detail => (
           detail.type
       ))

    const personalization = category.map(data => {
        return  typeData?.find(type => (
          type === data
        ))? null:{name:data}
    }).filter(data => data!== null)

    return (
        update ? (                
                        <>
                            <label className='label-font' >Type:</label>
                            <Dropdown value={details.type} name='type' filter 
                            options={personalization} optionValue='name' className=' placeholder-font-size '
                            onChange={handleChange} placeholder='Enter the type'
                            optionLabel="name"  />
                            {submitted && !details.type && <small className="p-error p-grid p-m-1">Type is required</small>}
                        </>
        )
        : (
                        <div className='p-col'>
                            <label className='p-ml-0 p-mt-2 p-mb-2 p-grid label-font'>Type:<span className='star-color'>*</span></label>
                            <Dropdown value={details.type} name='type' filter 
                            options={personalization} optionValue='name' className=' placeholder-font-size dropdown-placeholder '
                            onChange={handleChange} placeholder='Enter the type'
                            optionLabel="name" style={{ width: '16rem' }} />
                            {submitted && !details.type && <small className="p-error p-grid p-m-1">Type is required</small>}
                        </div>
        )
    )
}

export default Type
