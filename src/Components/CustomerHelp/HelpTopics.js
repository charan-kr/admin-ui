import React,{useState,useEffect} from 'react'
import { Tree } from 'primereact/tree';
import HelpData from './HelpData';
import { Button } from 'primereact/button';

const HelpTopics = () => {
  
    const [help, setHelp] = useState('')
    const [helpData,setHelpData] = useState(null)

    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('help'))
        setHelpData(data)              
    }, [])

    let topics = helpData?.map(ele => ele.topic)
    topics = Array.from(new Set(topics))

    const topicsData = topics.map(topic => {
        const subtopic = helpData?.filter(ele => ele.topic === topic)
        let value = {
            id: Math.random()*9,
            topic,
            subtopic
        }
        return value
    })


    const nodes = topicsData.map(help =>
    (
        {                  
            key: help.topic.length + 1,
            label: help.topic,
                children: help.subtopic.map(sub => (
                    {
                        key: sub.id, name: sub.subTopic                       
                    }                    
            ))  
        }
    )      
    )
    const helpEditor = (node) => {     
        const help = helpData.find(data => data.id === node.key)
        // const help = helpTopics.map(ele => ele.subtopic.find(ele => ele.id === node.key)).filter(data => data !== undefined)[0]
        console.log(help)       
        if (help) {
            setHelp(help)
        }
        else {
            setHelp(null)
        }
    }
    
    const nodeTemplate = (node) => {       
        
        let label = <b>{node.label}</b>

        if (!node.children) {
            label = <Button className='p-button-text p-p-0' onClick={() => helpEditor(node)}>{node.name}</Button>
        }
        return (
            <span>    
                {label}
            </span>
        )
    }
   
    
    return (
            <>
            <h1 style={{ fontWeight: '600' }}>Customer Help Topics</h1>
            <div className='p-grid'>        
                <div className='p-col-4'>
                    <Tree value={nodes} nodeTemplate={nodeTemplate} style={{backgroundColor:'#f0f0f0'}} />               
                </div>
                <div className='p-col'>
                  {help ? <HelpData help={help} /> : <b>Please select any help topics</b> }                                 
                </div>                              
            </div>
            
          </>  
 
    )
}

export default HelpTopics


