import React from 'react'
import parse from 'html-react-parser'
import { ScrollPanel } from 'primereact/scrollpanel';

const HelpData = ({ help }) => {
    
    return (
        <>
            <label className=''>{help.subTopic}</label>            
            <div className='p-field'>
                <ScrollPanel style={{ width: '100%', height: '340px' }} >
                    {parse(help.value)}                                        
                </ScrollPanel>                
            </div>
        </>        
    )
}

export default HelpData
