import React, { useState, useEffect } from 'react'
import { Tree } from 'primereact/tree';
import HelpEditor from './HelpEditor';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

const HelpTopics = () => {
    const [help, setHelp] = useState('')
    const [helpData, setHelpData] = useState([])
    const [menu, setMenu] = useState('')
    const [subMenu, setSubMenu] = useState('')
    const [onAddMenu, setOnAddMenu] = useState(false)
    const [onAddSubMenu, setOnAddSubMenu] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [onSave, setOnSave] = useState(false)
    const [topicName, setTopicName] = useState(null)
    const [deleteValue, setDeleteValue] = useState(null)
    const [checkingValue, setCheckingValue] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])
    console.log(confirmation)
    const fetchData = () => {
        const data = JSON.parse(localStorage.getItem('help'))
        setHelpData(data)
    }


    let topics = helpData?.map(ele => ele.topic)
    topics = Array.from(new Set(topics))

    const topicsData = topics.map(topic => {
        const subMenu = helpData?.filter(ele => ele.topic === topic)
        let value = {
            id: Math.random() * 9,
            topic,
            subMenu
        }
        return value
    })

    const nodes = topicsData.map(data =>
    (
        {
            key: data.topic?.length + 1,
            label: data.topic,
            children: [...data.subMenu.map(sub => (
                {
                    key: sub.id, name: sub.subTopic

                }
            )), {
                key: null, name: data.topic
            }
            ]
        }
    )
    )


    const nodeTemplate = (node) => {
        let label =
            <span>
                <b>{node.label}</b>
            </span>

        if (!node.children) {
            label = <div key={node.key}>
                {!node.key ?
                    <div className='p-d-flex p-jc-end'>
                        <Button icon="pi pi-plus" className='p-button-outlined' onClick={() => onAddDialog(node)} />
                    </div>
                    :
                    <div className='p-grid p-ai-center'>
                        <Button className='p-button-text p-p-0 p-mr-2' onClick={() => helpEditor(node)}>{node.name}</Button>
                        <Button icon="pi pi-minus" className=" p-button-outlined p-button-danger " onClick={() => onDeleteDialog(node)} />
                    </div>
                }
            </div>
        }

        return (
            <span >
                {label}
            </span>
        )
    }

    console.log(confirmation, 'co')


    const helpEditor = (node) => {
        if (checkingValue) {
            setConfirmation(true)
        }
        else {
            let findSubtopic = helpData.find(data => data.id === node.key)
            console.log(findSubtopic)
            if (findSubtopic) {
                setHelp(findSubtopic)
            }
        }
    }

    const reset = () => {
        setOnAddSubMenu(false)
        setOnAddMenu(false)
        setMenu('')
        setSubMenu('')
        setOnSave(false)
        setDeleteDialog(false)
        setDeleteValue(null)
    }


    const onAddNewMenu = () => {
        setOnSave(true)
        const newMenu = {
            id: Math.random() * 9000,
            topic: menu,
            subTopic: subMenu,
            value: ''
        }
        if (menu && subMenu) {
            const localData = JSON.parse(localStorage.getItem('help')) || []
            localStorage.setItem('help', JSON.stringify([...localData, newMenu]))
            fetchData()
            reset()
        }
    }

    const newSubMenu = () => {
        setOnSave(true)
        const newSubMenu = {
            id: Math.random() * 90,
            topic: topicName?.name,
            subTopic: subMenu,
            value: ''
        };
        if (subMenu) {
            const localData = JSON.parse(localStorage.getItem('help'))
            localStorage.setItem('help', JSON.stringify([...localData, newSubMenu]))
            fetchData()
            reset()
        }

    }

    const onAddDialog = (node) => {
        setOnAddSubMenu(true)
        setTopicName(node)
    }

    const onDeleteDialog = (node) => {
        setDeleteDialog(true)
        setDeleteValue(node)
    }


    const onDeleteSubMenu = () => {
        const localData = JSON.parse(localStorage.getItem('help'))
        const deleteSubMenu = localData.filter(data => data.id !== deleteValue?.key)
        localStorage.setItem('help', JSON.stringify(deleteSubMenu))
        fetchData()
        setHelp('')
        reset()
    }


    return (
        <>
            <h1 style={{ fontWeight: '600' }}>Browse Help Topics</h1>
            <div className='p-grid'>
                <div className='p-col-4 p-mt-3'>
                    <Tree key={nodes.key} value={nodes} nodeTemplate={nodeTemplate} style={{ backgroundColor: '#f0f0f0' }} />
                    <Button icon="pi pi-plus" className='p-button-outlined p-px-4 p-mt-2' onClick={() => setOnAddMenu(true)} />
                </div>
                <div className='p-col'>
                    {help ?
                        <HelpEditor helpData={help}
                            checking={checkingValue}
                            setChecking={setCheckingValue}
                            confirmation={confirmation}
                            setConfirmation={setConfirmation}
                            fetchData={fetchData} />
                        :
                        <b>Please select any help topics </b>
                    }
                </div>
            </div>
            {/* Menu Dialog Box */}
            <Dialog visible={onAddMenu} style={{ width: '450px' }} header='Adding New Topic'
                onHide={reset} >
                <div className='p-grid p-ai-center'>
                    <div className='p-col-5'>
                        <label>Topic Name</label>
                    </div>
                    <div className='p-col-10 p-fluid'>
                        <InputText value={menu} placeholder='Type your new topic' onChange={(e) => setMenu(e.target.value)} />
                        {onSave && !menu && <small className='p-error'>Required</small>}
                    </div>
                    <div className='p-col-5'>
                        <label>Sub Topic Name</label>
                    </div>
                    <div className='p-col-10 p-fluid'>
                        <InputText value={subMenu} placeholder='Type your new sub topic' onChange={(e) => setSubMenu(e.target.value)} />
                        {onSave && !subMenu && <small className='p-error'>Required</small>}
                    </div>
                </div>
                <div className="p-d-flex p-jc-between p-mt-3">
                    <Button
                        className="p-px-3 p-py-1 p-button-secondary"
                        label="Cancel" onClick={reset} />
                    <Button
                        className="p-px-4 p-py-1 p-button-success" onClick={onAddNewMenu} label="Add" />
                </div>
            </Dialog>

            {/* Sub menu Dialog Box */}
            <Dialog visible={onAddSubMenu} style={{ width: '450px' }} header={topicName?.name}
                onHide={reset} >
                <div className='p-grid p-ai-center'>
                    <div className='p-col-5'>
                        <label>Sub Topic</label>
                    </div>
                    <div className='p-col-10 p-fluid'>
                        <InputText value={subMenu} placeholder='Type your sub topic' onChange={(e) => setSubMenu(e.target.value)} />
                        {onSave && !subMenu && <small className='p-error'>Required</small>}
                    </div>
                </div>
                <div className="p-d-flex p-jc-between p-mt-3">
                    <Button
                        className="p-px-3 p-py-1 p-button-secondary"
                        label="Cancel" onClick={reset} />
                    <Button
                        className="p-px-4 p-py-1 p-button-success" onClick={newSubMenu} label="Add" />
                </div>
            </Dialog>

            {/* Delete Dialog Box */}
            <Dialog visible={deleteDialog} modal
                style={{ width: '450px' }}
                onHide={() => { setDeleteDialog(false); setTopicName(null) }}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Are you sure you want to delete <b>{deleteValue?.name}</b>?</span>}
                </div>
                <div className="p-d-flex p-jc-end p-mt-0">
                    <Button
                        className="p-px-3 p-py-1 p-button-danger" onClick={onDeleteSubMenu} label="Delete" />
                </div>
            </Dialog>
        </>

    )
}

export default HelpTopics
