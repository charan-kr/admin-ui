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
import AddPersonalization from './AddPersonalization';

const PersonalizationConfiguration = () => {
    const initialDetails = [{
        id:null,
        type:null,
        className:"",
        methodName:""
    }]
    const [personalization,setPersonalization] = useState([])
    const [details,setDetails] = useState(initialDetails)
    const [deletePersonalizationsDialog, setDeletePersonalizationsDialog] = useState(false);
    const [submitted,setSubmitted] = useState(false)
    const [updateDialog, setUpdateDialog] = useState(false);
    const [edit,setEdit] = useState(false)
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
    const reset = (prevData) => {
        setPersonalization(prevData)
        setDetails(initialDetails)
        setSubmitted(false)
        setUpdateDialog(false)
    }

    const onSaveUpdate = () => {
        setSubmitted(true)    
        const isValid = details.type && details.className && details.methodName
        if(!isValid) {
            toast.current.show({severity: 'error', summary: 'Fail', detail: 'Important fields are required'})
            fetchPersonalization()
        }
        if(isValid){
            let personalizationDetails = [...personalization]
             const id = details.id
                    personalizationService.updatePersonalization(id,details).then(() => {
                        toast.current.show({severity: 'success', summary: 'Success',detail:`${details.type} updated successfully`})
                        fetchPersonalization()
                        reset(personalizationDetails)
                    }).catch(() => {
                        toast.current?.show({severity: 'error', summary: 'Fail', detail: 'Something went wrong'});    
                })
        }
                   
    }

    const editPersonalization = (details) => {
        setEdit(true)
        setUpdateDialog(true)
        setDetails(details)
    }

    //Deleting by id
    const deletePersonalization = () => {
        const id = details.id
        const type = details.type
        personalizationService.deletePersonalization(id).then(() => {
        fetchPersonalization()
        toast.current.show({ severity: 'success', summary: 'Successful', detail:`${type} is deleted` });
        setDetails(initialDetails);
        setDeletePersonalizationsDialog(false);
         }).catch(() => {
             toast.current.show({severity: 'error', summary: 'Fail', detail: 'Something went wrong'});    
         })
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Link to='/personalization/personalizationConfiguration/addNew' style={{textDecoration:'none'}}><Button  label="Add New Personalization" icon="pi pi-plus"/></Link>               
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
    const hideUpdateDialog = () => {
        setSubmitted(false)
        setUpdateDialog(false)
    }

    const header = (
        <div className="table-header">
            <h3 className="p-m-0 p-text-bold">List of Personalization details</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const detailsDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideUpdateDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={onSaveUpdate} />
        </React.Fragment>
    );

    const deleteDetailsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeletePersonalizationsDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePersonalization}  />        
        </React.Fragment>
    );


   

    return (
        <div className="datatable-crud">
        <Toast ref={toast} />
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
                    <Column field="type" header="Type" sortable></Column>
                    <Column field="className" header="Class Name" ></Column>                 
                    <Column field="methodName" header="Method Name" ></Column>
                    <Column header="Actions" body={actionBodyTemplate} headerStyle={{width: '10rem'}}></Column>
                </DataTable>
            </div>
            {/* While editing only displaying this dialog */}
            {edit ? 
                <>
                    <Dialog visible={updateDialog} style={{ width: '500px' }} header="Personalization Configuration" modal className="p-fluid" footer={detailsDialogFooter} onHide={hideUpdateDialog} >
                         <AddPersonalization update={edit} id={details.id} updatedDetails={details} updateSubmit={submitted} />
                    </Dialog>
                </>
             : ''}
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

export default PersonalizationConfiguration
