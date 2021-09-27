import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { ChatbotService } from '../../Service/ChatbotService'
import { useToast } from '../../../hooks/useToast'


const Options = ({ chatbotConfig, resetChatbotDialog, type, fetchData, updateSteps, triggerData }) => {
    const [steps, setSteps] = useState(chatbotConfig)
    const [update, setUpdate] = useState(updateSteps)
    const toast = useToast();

    const chatbotService = new ChatbotService()

    const [stepOptions, setStepOptions] = useState([{
        value: '',
        label: '',
        trigger: ''
    }])
    useEffect(() => {
        if (update) {
            setStepOptions(chatbotConfig.options)
        }
    }, [chatbotConfig, update])

    const onOptionsChange = (e, i) => {
        const { value, name } = e.target
        let steps = [...stepOptions]
        steps[i][name] = value
        setStepOptions(steps)

    }
    const onAddingDetails = () => {
        const newStep = {
            value: '',
            label: '',
            trigger: ''
        }
        setStepOptions([...stepOptions, newStep])
    }
    const onDeleteDetails = (index) => {
        setStepOptions(stepOptions.filter((_, i) => i !== index))
    }

    const onSavingSteps = () => {
        const body = {
            type,
            id: steps.id,
            message: '',
            trigger: '',
            options: stepOptions,
            component: '',
            user: false,
            waitAction: false,
            metadata: {},
        }

        if (update) {
            chatbotService.updateChatbotSteps(body).then(() => {
                toast({ severity: 'success', summary: 'Success', detail: `${steps.id} updated successfully` })
                setUpdate(false)
                fetchData()
                resetChatbotDialog()
            }).catch((err) => {
                toast({ severity: 'error', summary: 'Fail', detail: err?.response?.data?.message });
            })
        }
        else {
            chatbotService.postChatbotSteps(body).then(() => {
                toast({ severity: 'success', summary: 'Success', detail: `${steps.id} steps added` })
                fetchData()
                resetChatbotDialog()
            }).catch((err) => {
                toast({ severity: 'error', summary: 'Fail', detail: err?.response?.data?.message });
            })
        }

    }

    const triggerOptions = () => {
        if (update) {
            return triggerData.filter(data => data !== steps.id)
        }
        else {
            return triggerData
        }
    }

    return (
        <>
            <div className='p-grid p-ai-center'>
                <div className='p-col-3'>
                    <label className='p-grid' style={{ fontWeight: '600' }} >Id</label>
                </div>
                :
                <div className="p-col-6 p-ml-3">
                    <InputText name='id' disabled={update}
                        value={steps.id} className='p-mt-2'
                        onChange={(e) => setSteps({ ...steps, id: e.target.value })} placeholder='Enter the id' />
                </div>
            </div>
            {stepOptions.map((option, i) => (
                <div key={i} className='p-grid'>
                    <div className="p-col-3">
                        <label className='p-grid ' style={{ fontWeight: '600' }}>Value:</label>
                        <InputText name='value'
                            className='p-mt-2 '
                            value={option.value}
                            placeholder='value'
                            onChange={(e) => onOptionsChange(e, i)} />

                    </div>
                    <div className="p-col ">
                        <label className='p-grid ' style={{ fontWeight: '600' }}>Label:</label>
                        <InputText name='label' value={option.label}
                            className='p-mt-2' placeholder='Enter your label'
                            onChange={(e) => onOptionsChange(e, i)} />
                    </div>
                    <div className="p-col ">
                        <label className='p-grid ' style={{ fontWeight: '600' }}>Trigger:</label>
                        <Dropdown value={option.trigger} options={triggerOptions()} name='trigger'
                            className='p-mt-2' placeholder='Select the trigger id'
                            onChange={(e) => onOptionsChange(e, i)} />
                    </div>
                    <div className='p-col-1 p-pt-4 button-style' >
                        {i ?
                            <Button icon="pi pi-minus" className=" p-button-outlined p-button-danger " onClick={() => onDeleteDetails(i)} />
                            :
                            <Button icon="pi pi-plus" className=" p-button-outlined " onClick={() => onAddingDetails()} />
                        }
                    </div>

                </div>
            ))}
            <div className="p-grid p-jc-end p-mt-3">
                <div className='p-d-flex'>
                    <Button
                        className=" p-py-2 p-pr-4 p-m-2  p-button-secondary"
                        label="Cancel" onClick={resetChatbotDialog} />
                    <Button
                        className=" p-button-success p-m-2 p-py-2 p-pr-3 " label={update ? 'Update' : 'Add'} onClick={onSavingSteps} />
                </div>
            </div>
        </>
    )
}

export default Options
