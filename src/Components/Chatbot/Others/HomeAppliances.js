import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react'

const HomeAppliances = () => {

    const mobiles = [
        { name: 'Coolers', price: '22,000' },
        { name: 'AC', price: '38,000' },
        { name: 'Fridge', price: '21,999' }
    ]

    const header = (
        [
            <img alt="Card" style={{ width: '140px', height: 'auto', padding: '1rem' }} src='https://m.media-amazon.com/images/I/71+1hl5TUOL._AC_UL480_FMwebp_QL65_.jpg' />,
            <img alt="Card" style={{ width: '140px', height: 'auto', padding: '1rem' }} src='https://images-eu.ssl-images-amazon.com/images/I/21s9ftWDudL._AC_SX368_.jpg' />,
            <img alt="Card" style={{ width: '90px', height: 'auto', padding: '1rem' }} src='https://images-eu.ssl-images-amazon.com/images/I/41h4qj5uBML._AC_SX368_.jpg' />
        ]

    );

    const footer = (
        <span>
            <Button label="Order" icon="pi pi-check" className="p-button-success " />
            <Button label="Cancel" icon="fa fa-ban" className="p-button-secondary p-ml-2" />
        </span>
    );


    return (
        <div>
            {mobiles.map((product, i) => (
                <Card title={product.name} className='p-m-5'
                    subTitle={`MRP :${product.price}`} style={{ width: '25em' }}
                    header={header[i]}
                    footer={footer}>
                </Card>
            ))}
        </div>
    )
}

export default HomeAppliances
