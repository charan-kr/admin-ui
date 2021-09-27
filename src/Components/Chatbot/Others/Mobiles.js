import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React, { useEffect } from 'react'

const Mobiles = ({ triggerNextStep }) => {

    useEffect(() => {
        triggerNextStep()
    }, [])

    const mobiles = [
        { name: 'Samsung Galaxy M31', price: '14,999' },
        { name: 'Redmi Note 10', price: '13,499' },
        { name: 'OnePlus Nord 2', price: '29,999' }
    ]
    const header = (
        [
            <img alt="Card" style={{ width: '100px', height: 'auto', padding: '1rem' }} src='https://images-eu.ssl-images-amazon.com/images/I/41+xWzgV8jL.jpg' />,
            <img alt="Card" style={{ width: '100px', height: 'auto' }} src='https://images-eu.ssl-images-amazon.com/images/I/31kpAzgIFsL.jpg' />,
            <img alt="Card" style={{ width: '150px', height: 'auto' }} src='https://images-eu.ssl-images-amazon.com/images/I/41bUrjJLJyS.jpg' />
        ]

    );
    const footer = (
        <span>
            <Button label="Order" icon="pi pi-check" className="p-button-success " />
            <Button label="Cancel" icon="fa fa-ban" className="p-button-secondary p-ml-2" />
        </span>
    );


    return (
        <div className='p-d-flex p-ai-start'>
            <div className='p-col'>
                {mobiles.map((product, i) => (
                    <Card title={product.name} className='p-m-0' subTitle={`MRP :${product.price}`} style={{ width: '20rem' }}
                        header={header[i]}
                        footer={footer}>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Mobiles
