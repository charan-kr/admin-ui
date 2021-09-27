import React,{useState,useEffect,useRef} from 'react'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Link, useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Editor } from "primereact/editor";
import { FooterTemplateService } from '../../Service/FooterTemplateService'

const FooterTemplate = ({ edit = false, config = null }) => {

    const [footerName,setFooterName] = useState('')
    const [footerBody, setFooterBody] = useState('')
    const [footerData,setFooterData] = useState(null)
    const history = useHistory()
    const [submitted,setSubmitted] = useState(false)  
    const toast = useRef(null);
    
    useEffect(() => {
        if (edit && config) {
            setFooterName(config.footerName)
            setFooterBody(config.footerBody)
        }
        footerService.getAllFooterTemplates().then(res =>{
            setFooterData(res.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit, config])

    const footerService = new FooterTemplateService()
    

     const reset = () => {
         setSubmitted(false)
        setFooterName('')
        setFooterBody('')
    }
   
    const onHandleChange = (e,name) => {        
        if (name === 'footerName') {
               let savedFooter = footerData?.map(data => data.footerName.toLowerCase())  
            if(!savedFooter?.includes(e.target.value.toLowerCase())){
                setFooterName(e.target.value)
            }
            else{
                toast.current?.show({severity: 'error', summary: 'Already Exist', detail: `${e.target.value} is already exists`})
            }
        }
        else {
            setFooterBody(e.htmlValue)
        }
       }

     const onDetailsSubmit = () => {
         setSubmitted(true)
         const isValid = footerName && footerBody
         const body = {              
             footerName: footerName,
             footerBody:footerBody
         }
         if (isValid) {
             
             if (edit) {
                 const id = config.id
                 body.id = id
                 footerService.updateFooterTemplate(id, body).then(() => {
                     toast.current.show({ severity: 'success', summary: 'Success', detail: `${body.footerName} is Updated` })
                     setTimeout(() => {
                         history.push('/templating/footerTemplate')
                         reset()
                     }, 700);
                
                 })
             }
             else {
                 footerService.postFooterTemplate(body).then(() => {
                     toast.current.show({ severity: 'success', summary: 'Success', detail: `${body.footerName} is Added` })
                     setTimeout(() => {
                         history.push('/templating/footerTemplate')
                         reset()
                     }, 700);
                 })
             }
         }
    }

    return (
        <>
        <Toast ref={toast} />                 
            <h3 className='p-pt-4 p-pl-4'>Adding Footer Template </h3>    
            <div className='p-fluid'>                
                    <div className='p-m-2'>
                            <div className="p-field  p-col-6">                      
                                <label  className='p-m-2 p-grid'>Footer Name:<span className='star-color'>*</span></label>
                                <InputText name='footerName' 
                                className='p-mt-0 p-ml-2' value={footerName} 
                            onChange={(e) => onHandleChange(e,'footerName')} placeholder='Enter your Footer Name'  />
                        {submitted && !footerName && <small className="p-error p-grid p-m-2">Footer Name is required</small>}    
                    </div>
                    <div className='p-field  p-col'>
                        <label  className='p-m-2 p-grid'>Footer Body:<span className='star-color'>*</span></label>
                        <Editor style={{ height: "150px" }} className='p-mt-0 p-ml-2'
                            value={footerBody} onTextChange={(e) => onHandleChange(e, 'footerBody')} />
                        {submitted && !footerBody && <small className="p-error p-grid p-m-2">Footer Body is required</small>}    
                    </div>
                    </div>   
            </div>                                      
            <div className='p-d-flex p-jc-end p-pr-2'>
                <div className='p-p-1'>
                    <Link to='/templating/footerTemplate' ><Button className='p-button-secondary' label="Cancel"/></Link>
                </div>
                <div className='p-p-1'>
                  <Button className={edit ? 'p-button-success' : ''} onClick={onDetailsSubmit} label={edit ? 'Update' : 'Save'}/>
                </div>
            </div>
          </>
    )
}

export default FooterTemplate
