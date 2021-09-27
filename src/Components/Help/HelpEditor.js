import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { Editor } from 'primereact/editor'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Divider } from 'primereact/divider'
import parse from 'html-react-parser'

const HelpEditor = ({ helpData, confirmation, fetchData, setChecking, setConfirmation }) => {

    const [preview, setPreview] = useState(false)
    const [checkingDialog, setCheckingDialog] = useState(false)
    const [prevData, setPrevData] = useState(helpData.value)
    const [help, setHelp] = useState(helpData)

    useEffect(() => {
        if (confirmation) {
            setCheckingDialog(true)
        }
        else {
            setCheckingDialog(false)
        }
        // eslint-disable-next-line
    }, [confirmation])

    useEffect(() => {
        setPrevData(helpData.value)
        setHelp(helpData)
        setChecking(false)
        // eslint-disable-next-line
    }, [helpData])

    const handleText = (e) => {
        console.log(e.htmlValue === prevData)
        setHelp((prevState) => (
            {
                ...prevState, value: e.htmlValue
            }
        ))
        if (prevData === e.htmlValue) {
            setChecking(false)
        }
        else {
            setChecking(true)
        }
    }
    const handleSubMenu = (e) => {
        setHelp((prevState) => (
            {
                ...prevState, subTopic: e.target.value
            }
        ))
    }


    const onSave = () => {
        const localData = JSON.parse(localStorage.getItem('help'))
        let prevData = localData.map(data => data.id === help.id ? { ...help, subTopic: help.subTopic, value: help.value } : data)
        localStorage.setItem('help', JSON.stringify(prevData))
        fetchData()
        setPreview(false)
        setChecking(false)
        setCheckingDialog(false)
    }

    const confirmSelect = () => {
        setChecking(false)
        setCheckingDialog(false)
    }


    return (
        <>
            <div className='p-grid'>
                <div className='p-col p-mt-1'>
                    <label className='p-grid p-mb-1'>Sub Topic</label>
                    <InputText value={help.subTopic} placeholder='Type your sub menu' onChange={(e) => handleSubMenu(e)} />
                </div>
            </div>
            <div className='p-col '>
                <label className='p-grid p-mb-2'>Editor</label>
                <Editor style={{ height: '18rem' }}
                    value={help.value} onTextChange={(e) => handleText(e)} />
                <div className='p-grid p-jc-end p-mt-2'>
                    <Button label='Review' onClick={() => setPreview(true)} />
                </div>
            </div>
            <Dialog showHeader={false} visible={preview} style={{ width: '65vw' }} onHide={() => setPreview(false)}>
                {parse(help.value)}
                <Divider />
                <div className="p-d-flex p-jc-between p-mt-3">
                    <Button
                        className="p-px-3 p-py-1 p-button-secondary"
                        label="Cancel" onClick={() => setPreview(false)} />
                    <Button
                        className="p-px-4 p-py-1 p-button" onClick={onSave} label="Confirm" />
                </div>
            </Dialog>
            <Dialog visible={checkingDialog}
                style={{ width: '450px' }}
                header='Confirm'
                onHide={() => setCheckingDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {<span>Are you sure to change menu without <b>saving changes</b>?</span>}
                </div>
                <div className="p-d-flex p-jc-end p-mt-0">
                    <div className='p-mt-3 p-px-2 p-py-1'>
                        <Button className="p-px-3 p-py-1 p-button-success" onClick={() => setConfirmation(false)} label="No" />
                    </div>
                    <div className='p-mt-3 p-px-2 p-py-1'>
                        <Button className="p-px-3 p-py-1 p-button-secondary" onClick={confirmSelect} label="Yes" />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default HelpEditor
