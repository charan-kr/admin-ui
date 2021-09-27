import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react'

const Fashion = () => {

    const fashion = [
        { name: 'Fashion sale' },
    ]
    const header = (
        <img alt="Card" style={{ width: '350px', height: 'auto' }} src='https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2021/AW21/4.jpg' />
    );
    const footer = (
        <span>
            <Button label="Book" icon="pi pi-check" className="p-button-success p-ml-2" />
            <Button label="Cancel" icon="fa fa-ban" className="p-button-secondary p-ml-2" />
        </span>
    );


    return (
        <div className='p-d-flex'>
            {fashion.map(product => (
                <Card title={product.name} subTitle="Men's Clothing" style={{ width: '25em' }}
                    header={header}
                    footer={footer}>
                </Card>
            ))}
        </div>
    )
}

export default Fashion
