import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import Message from './StepTypes/Message';
import Options from './StepTypes/Options';
import Components from './StepTypes/Components';
import User from './StepTypes/User';
import { STEP_TYPES } from '../../utils/constants';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Chip } from 'primereact/chip';
import { ChatbotService } from '../Service/ChatbotService';
import { useToast } from '../../hooks/useToast';

const ChatbotConfig = () => {

    const initialSteps = {
        id: "",
        message: "",
        trigger: ""
    }
    const [chatbotConfig, setChatbotConfig] = useState(initialSteps)
    const [chatbotData, setChatbotData] = useState([])
    const [triggerData, setTriggerData] = useState([])
    const [stepType, setStepType] = useState('')
    const [updateSteps, setUpdateSteps] = useState(false)
    const [chatbotConfigDialog, setChatbotConfigDialog] = useState(false);
    const [deleteStepsDialog, setDeleteStepsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line               
    }, [])

    const chatbotService = new ChatbotService()

    const fetchData = () => {
        chatbotService.getChatbotAllSteps().then(res => {
            const trigger = res.data?.map(val => val.id)
            setTriggerData(trigger)
            console.log(res.data)
            setChatbotData(res.data || [])
        }).catch(err => {
            if (err.response?.status === 400) {
                toast({ severity: 'error', summary: err?.response?.data?.message, detail: 'empty' });
            }
        })
    }


    const reset = () => {
        setStepType('')
        setChatbotConfig(initialSteps)
        setChatbotConfigDialog(false);
        setUpdateSteps(false)
        setDeleteStepsDialog(false)
    }

    const hideDialog = () => {
        reset()
    }



    const deleteSteps = () => {
        const id = chatbotConfig.id
        chatbotService.deleteChatbotSteps(id).then(() => {
            toast({ severity: 'success', summary: 'Successful', detail: `${id} is deleted` })
            fetchData()
            reset()
        }).catch((err) => {
            toast({ severity: 'error', summary: 'Fail', detail: err?.response?.data?.message });
        })
    }

    const confirmDeleteSteps = (steps) => {
        setChatbotConfig(steps)
        setDeleteStepsDialog(true)
    }
    const editStepsTemplate = (data) => {
        setChatbotConfigDialog(true)
        setStepType(data.type)
        setChatbotConfig(data)
        setUpdateSteps(true)
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Add New Steps" icon="pi pi-plus" onClick={() => setChatbotConfigDialog(true)} />
            </React.Fragment>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className=''>
                    <Button icon="pi pi-pencil" className="p-mr-1 p-button-text p-button-rounded p-button-success" onClick={() => editStepsTemplate(rowData)} />
                    <Button icon="pi pi-trash" className=" p-button-rounded p-button-text p-button-danger" onClick={() => confirmDeleteSteps(rowData)} />
                </div>
            </React.Fragment>
        );
    }


    const contentTemplate = (data) => {
        switch (data.type) {
            case STEP_TYPES.user:
                return <span style={{ fontWeight: '600' }}>Not Applicable</span>
            case STEP_TYPES.message:
                return (
                    data.message.split(' ').length < 20 ? data.message
                        :
                        (<ScrollPanel style={{ width: '100%', height: '60px' }} >
                            <div style={{ padding: '0.5em', lineHeight: '1.3' }}>{data.message}</div>
                        </ScrollPanel>)
                )
            case STEP_TYPES.options:
                return (
                    <ScrollPanel style={{ width: '100%', height: '60px' }}>
                        <div className='p-grid p-jc-between'>
                            <div className='p-mb-2'>
                                <label className=''>Label</label>
                                {data.options?.map(val => (
                                    <div className='p-mt-1'>
                                        <Chip label={val.label} className="p-mr-2 p-mb-2" />
                                    </div>
                                ))}
                            </div>
                            <div className='p-mb-2'>
                                <label className=''>Trigger</label>
                                {data.options?.map(val => (
                                    <div className='p-mt-1'>
                                        <Chip label={val.trigger ? val.trigger : '-'} className="p-mr-2 p-mb-2 " />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollPanel>
                )
            case STEP_TYPES.component:
                return data.component
            default:
                return ''
        }
    }

    const triggerTemplate = (data) => {
        return (
            data.type === STEP_TYPES.options ? <span style={{ fontWeight: '600' }}>Not Applicable</span> : data.trigger
        )
    }




    const header = (
        <div className="p-d-flex p-jc-between p-ai-center">
            <h3 className="p-m-0 p-text-bold">List of Steps to Chatbot</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const footer = <div style={{ textAlign: 'left' }}>
        <Button icon="pi pi-refresh" tooltip="Reload" onClick={() => fetchData()} />
    </div>

    const typesOfSteps = ['Message', 'Options', 'Component', 'User']

    return (
        <>
            <div>
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable paginator rows={10}
                    value={chatbotData} paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Step details"
                    globalFilter={globalFilter} header={header} footer={footer} className="p-datatable-gridlines p-datatable-sm paginator-dropdown"
                    emptyMessage="No Details found.">
                    <Column field="id" header="ID" headerStyle={{ width: '3rem' }} />
                    <Column field="type" header="Type" headerStyle={{ width: '3rem' }} />
                    <Column header="Content" headerStyle={{ width: '8rem' }} body={contentTemplate} />
                    <Column field="trigger" header="Trigger" headerStyle={{ width: '3rem' }} body={triggerTemplate} />
                    <Column header="Actions" body={actionBodyTemplate} headerStyle={{ width: '2rem' }} ></Column>
                </DataTable>
            </div>

            <Dialog visible={chatbotConfigDialog} style={{ width: '950px' }}
                header="Adding new step" modal className="p-fluid"
                onHide={hideDialog}>
                <div className='p-grid p-ai-center'>
                    <div className='p-col-3'>
                        <label className='p-grid' style={{ fontWeight: '600' }} >Type</label>
                    </div>:
                    <div className='p-col-6 p-ml-3'>
                        <Dropdown value={stepType}
                            disabled={updateSteps}
                            options={typesOfSteps}
                            className='p-mt-2'
                            onChange={(e) => setStepType(e.value)}
                            placeholder="Select the type" />
                    </div>
                </div>
                {stepType === STEP_TYPES.message &&
                    <Message updateSteps={updateSteps}
                        fetchData={fetchData} chatbotConfig={chatbotConfig}
                        type={stepType} resetChatbotDialog={reset} triggerData={triggerData} />}
                {stepType === STEP_TYPES.options &&
                    <Options updateSteps={updateSteps}
                        fetchData={fetchData} chatbotConfig={chatbotConfig}
                        type={stepType} resetChatbotDialog={reset} triggerData={triggerData} />}
                {stepType === STEP_TYPES.component &&
                    <Components updateSteps={updateSteps}
                        fetchData={fetchData} chatbotConfig={chatbotConfig}
                        type={stepType} resetChatbotDialog={reset} triggerData={triggerData} />}
                {stepType === STEP_TYPES.user &&
                    <User updateSteps={updateSteps}
                        fetchData={fetchData} chatbotConfig={chatbotConfig}
                        type={stepType} resetChatbotDialog={reset} triggerData={triggerData} />}
            </Dialog>
            <Dialog visible={deleteStepsDialog} modal header="Confirm"
                style={{ width: '450px' }}
                onHide={reset}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {chatbotConfig && <span>Are you sure you want to delete <b>{chatbotConfig.id}</b>?</span>}
                </div>
                <div className="p-d-flex p-jc-end p-mt-3">
                    <Button
                        className="p-px-3 p-py-1 p-button-danger" onClick={deleteSteps} label="Delete" />
                </div>
            </Dialog>
        </>

    );
}

export default ChatbotConfig
