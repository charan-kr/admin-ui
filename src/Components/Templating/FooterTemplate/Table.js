import React, { useState,useEffect,useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Link } from 'react-router-dom';
import { ScrollPanel } from 'primereact/scrollpanel';
import CustomBreadcrumbs from '../../CustomBreadCrumbs';
import parse  from 'html-react-parser'
import { FooterTemplateService } from '../../Service/FooterTemplateService'

const Table = () => {
   
    const[footer,setFooter] = useState([])
    const [details, setDetails] = useState(null)
    const [display, setDisplay] = useState(false)
    const [fullView, setFullView] = useState(null)
    const [deleteFooterDialog, setDeleteFooterDialog] = useState(false);   
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const footerService = new FooterTemplateService()

    const fetchData = () => {
        footerService.getAllFooterTemplates().then(res => {    
            console.log(res)       
            setFooter(res.data)
        }).catch(err => {
            if(err.response?.status === 400){
                toast.current.show({severity: 'error', summary: 'Error', detail: 'empty'});   
            }
        })
    }


    const confirmDeleteFooter = (data) => {
        console.log(data)
        setDetails(data);
        setDeleteFooterDialog(true);
    }

   

    const deleteFooter = () => {
        footerService.deleteFooterTemplate(details?.id).then(() => {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: `${details?.footerName} is Deleted Successfully` })
            fetchData()
            setDeleteFooterDialog(false)
       })
    }

  
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Link to='/templating/footerTemplate/add' ><Button  label="Add New Footer" icon="pi pi-plus"/></Link>               
            </React.Fragment>
        )
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link to={`/templating/footerTemplate/edit/${rowData.id}`}>                    
                <Button icon="pi pi-pencil"
                    className="p-button-rounded p-button-success p-mr-2"
                        />
                    </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteFooter(rowData)} />
            </React.Fragment>
        );
    }

   

    const header = (
        <div className="p-d-flex p-jc-between">
            <h3 className="p-m-0 p-text-bold">List of Footer details</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );


    const deleteDetailsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteFooterDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteFooter}  />        
        </React.Fragment>
    ); 
       
        
    const fullViewTemplate = (data) => {      
        setFullView(data)
        setDisplay(true)
    }

    const footerBodyTemplate = (data) => {       
        return (
            <>
                <ScrollPanel style={{ width: '100%', height: '80px' }} >
                    <div style={{ padding: '0.5em', lineHeight: '1.3' }}>{parse(data.footerBody || '')}</div>
                </ScrollPanel>
                <div className='p-grid p-jc-end'>
                    <Button label='Full View' onClick={() => fullViewTemplate(data)} />                    
                </div>                                               
            </>            
        )
    }


   const breadcrumbs = [
        {
            label: "FooterTemplateDetails",
            path: "/templating/footerTemplate",
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        }
    ];
    const retrieveData = () => {
        fetchData()
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: `Data retrieved Successfully` })
    }    

    const refresh =
    <div style={{ textAlign: 'left' }}>
        <Button onClick={retrieveData} icon="pi pi-refresh" tooltip="Reload" />             
         </div>
    

    return (
        <div> 
        <Toast ref={toast} /> 
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />    
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable className='p-datatable-gridlines  p-datatable-sm paginator-dropdown' 
                    ref={dt} value={footer}                     
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Footer details"
                    globalFilter={globalFilter} 
                    header={header} footer={refresh}  >               
                    <Column field="footerName" header="Footer Name" sortable></Column>
                    <Column field="footerBody" header="Footer Body" body={footerBodyTemplate}></Column>                                     
                    <Column header="Actions" body={actionBodyTemplate} headerStyle={{width: '10rem'}}></Column>
            </DataTable>
            
             <Dialog  header={fullView?.footerName} visible={display}  style={{ width: '65vw' }} onHide={() => setDisplay(false)}>                                    
                {parse(fullView?.footerBody || '')}               
            </Dialog>
            
            <Dialog visible={deleteFooterDialog} 
             style={{ width: '450px' }} header="Confirm" modal 
             footer={deleteDetailsDialogFooter} 
             onHide={() => setDeleteFooterDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {details && <span>Are you sure you want to delete <b>{details?.footerName}</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default Table
