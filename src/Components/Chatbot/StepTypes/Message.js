import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { ChatbotService } from '../../Service/ChatbotService'
import { useToast } from '../../../hooks/useToast'


const Message = ({ chatbotConfig, resetChatbotDialog, type, fetchData, updateSteps, triggerData }) => {

    const [steps, setSteps] = useState(chatbotConfig)
    const [update, setUpdate] = useState(updateSteps)
    const toast = useToast();

    const chatbotService = new ChatbotService()

    const onStepsChange = (e) => {
        const { name, value } = e.target
        setSteps(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ))
    }

    const onSavingSteps = () => {
        const body = {
            type,
            id: steps.id,
            message: steps.message,
            trigger: steps.trigger,
            options: [],
            component: '',
            user: false,
            waitAction: false,
            metadata: {}
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
                        onChange={onStepsChange} placeholder='Enter the id' />
                </div>
            </div>
            <div className='p-grid p-ai-center'>
                <div className="p-col-3 ">
                    <label className='p-grid ' style={{ fontWeight: '600' }}>Message</label>
                </div>
                :
                <div className='p-col p-ml-3'>
                    <InputTextarea name='message'
                        className='p-mt-2' value={steps.message} autoResize rows={4}
                        onChange={onStepsChange} placeholder='Enter your message' />
                </div>
            </div>
            <div className='p-grid p-ai-center'>
                <div className='p-col-3'>
                    <label className='p-grid' style={{ fontWeight: '600' }} >Trigger</label>
                </div>
                :
                <div className="p-col-6 p-ml-3">
                    <Dropdown name='trigger' options={triggerOptions()} value={steps.trigger} className='p-mt-2'
                        onChange={onStepsChange} placeholder='Select the trigger id' />
                </div>
            </div>
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

export default Message
