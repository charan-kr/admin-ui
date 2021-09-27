import React, { useState,useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { PersonalizationService } from '../Service/PersonalizationService'
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Link } from 'react-router-dom';
import CustomBreadcrumbs from '../CustomBreadCrumbs';

const NotificationSchedulerDetails = () => {
    const initialDetails = {
       name : "" ,
        to : "",
        cc : "",
        bcc : "",
        template : "",
        modelClass : "",
        modelClassMethod : "",
        type : ""	
    }
    const [personalization,setPersonalization] = useState([])
    const [details,setDetails] = useState(initialDetails)
    const [deletePersonalizationsDialog, setDeletePersonalizationsDialog] = useState(false);
    // const [submitted,setSubmitted] = useState(false)
    // const [updateDialog, setUpdateDialog] = useState(false);
    // const [edit,setEdit] = useState(false)
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    
    const personalizationService = new PersonalizationService() 

    useEffect(() => {
        fetchPersonalization()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const fetchPersonalization = () => {
        personalizationService.getPersonalization().then(res => {           
            setPersonalization(res.data)
        }).catch(err => {
            if(err.response?.status === 400){
                setPersonalization([])
                toast.current.show({severity: 'error', summary: err.response.data.message, detail: 'empty'});   
            }
        })
    }

   const confirmDeletePersonalization = (details) => {
        setDetails(details);
        setDeletePersonalizationsDialog(true);
    }
    // const reset = (prevData) => {
    //     setPersonalization(prevData)
    //     setDetails(initialDetails)
    //     setSubmitted(false)
    //     setUpdateDialog(false)
    // }

    const editPersonalization = (details) => {
        // setEdit(true)
        // setUpdateDialog(true)
        setDetails(details)
    }

    //Deleting by id
  
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Link to='/notificationScheduler/notification-scheduler-details/add' style={{textDecoration:'none'}}><Button  label="Add New Notification Schedule" icon="pi pi-plus"/></Link>               
            </React.Fragment>
        )
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editPersonalization(rowData)}/>                
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeletePersonalization(rowData)} />
            </React.Fragment>
        );
    }
    // const hideUpdateDialog = () => {
    //     setSubmitted(false)
    //     setUpdateDialog(false)
    // }

    const header = (
        <div className="p-d-flex p-jc-between">
            <h3 className="p-m-0 p-text-bold">List of Notification Scheduleer details</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    // const detailsDialogFooter = (
    //     <React.Fragment>
    //         <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideUpdateDialog} />
    //         <Button label="Update" icon="pi pi-check" className="p-button-text" />
    //     </React.Fragment>
    // );

    const deleteDetailsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeletePersonalizationsDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text"   />        
        </React.Fragment>
    );

const breadcrumbs = [
  {
    label: "NotificationSchedulerDetails",
    path: "/notificationScheduler/notification-scheduler-details",
    icon: "fa fa-home",
    onlyIcon: false,
    showIcon: false,
  }
];
   

    return (
        <div className="datatable-crud">
        <Toast ref={toast} />
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
         <div className="personalization">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable className='p-datatable-gridlines p-datatable-sm paginator-dropdown' 
                    ref={dt} value={personalization} 
                    selection={selectedDetails} onSelectionChange={(e) => setSelectedDetails(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Personalization details"
                    globalFilter={globalFilter}
                    header={header}  >               
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="to" header="To" ></Column>                 
                    <Column field="cc" header="Cc" ></Column>
                    <Column field="bcc" header="Bcc" ></Column>
                    <Column field="template" header="Template" ></Column>
                    <Column field="modelClass" header="Model Class" ></Column>
                    <Column field="modelClassMethod" header="Model Class Method" ></Column>
                    <Column field="type" header="Type" ></Column>
                    <Column header="Actions" body={actionBodyTemplate} headerStyle={{width: '10rem'}}></Column>
                </DataTable>
            </div>          
             <Dialog visible={deletePersonalizationsDialog} 
             style={{ width: '450px' }} header="Confirm" modal 
             footer={deleteDetailsDialogFooter} 
             onHide={() => setDeletePersonalizationsDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {details && <span>Are you sure you want to delete <b>{details.type}</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default NotificationSchedulerDetails
