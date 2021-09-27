import React,{useState,useEffect,useRef} from 'react'
import Type from './Type';
import ClassName from './ClassName';
import MethodName from './MethodName';
import { PersonalizationService } from '../Service/PersonalizationService'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Link, useHistory } from 'react-router-dom';

const AddPersonalization = ({update,updatedDetails,updateSubmit}) => {
    const initialDetails = [{
        id:null,
        type:null,
        className:"",
        methodName:""
    }]
    const [personalization,setPersonalization] = useState([])
    const [details,setDetails] = useState(initialDetails)
    const history = useHistory()
    const [submitted,setSubmitted] = useState(false)  
     const toast = useRef(null);
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

     const onAddingDetails = () => {
                const newDetails = {
                    type:null,
                    className:"",
                    methodName:""
                }       
                setDetails([...details,newDetails]) 
            }    

    const onDeleteDetails = (index) => {
         setDetails(details.filter((_,i) => i!==index ))
    }

   const onHandleChange = (e,i,name) => {
         const {value} = e.target
        let personalization = [...details]
        if(name === 'type'){
            let prevData = details.filter(detail => detail.type !== '').map(detail => detail.type)  
            if(!prevData.includes(value)){
                personalization[i][name] = value
            }
            else{
                toast.current.show({severity: 'error', summary: 'Already Exist', detail: `${value} is already exist`})
            }
        }
        else{
            personalization[i][name] = value
        } 
        setDetails(personalization)
         
    }

    const onHandleUpdate = (e,name) => {
        let value = updatedDetails
         value[name] = e.target.value
        setDetails([value])
    }

     const reset = (prevData) => {
        setPersonalization(prevData) 
        setDetails(initialDetails)
        setSubmitted(false)
    }
     const onDetailsSubmit = () => {
        setSubmitted(true)
        const isValid = details.every(detail => (
            detail.type && detail.className && detail.methodName
        ))
         if(!isValid) {
            toast.current.show({severity: 'error', summary: 'Fail', detail: 'Important fields are required'})
        }
        if(isValid){
            // Adding personalization details(POST)
                let personalDetails = [...personalization]               
                      details.map(detail =>  personalizationService.postPersonalization(detail).then(() =>{
                        toast.current.show({severity: 'success', summary: 'Success',detail:`${detail.type} is added`})                        
                        reset(personalDetails)
                         setTimeout(() => {
                            history.push('/personalization/personalizationConfiguration')                            
                        }, 1000);
                    }).catch(() => {
                        toast.current.show({severity: 'error', summary: 'Fail', detail: 'Something went wrong'});    
                })  
                )
                
               
        }
    }

    return (
        <>
        <Toast ref={toast} />
        {update ?  
       ( 
           <>
            <div className='p-field'>
                <Type update={update} submitted={updateSubmit} details={updatedDetails} handleChange={(e) => onHandleUpdate(e,'type')} />
            </div>
            <div className='p-field'>
                <ClassName update={update} submitted={updateSubmit} details={updatedDetails} handleChange={(e) => onHandleUpdate(e,'className')} />
            </div>
            <div className='p-field'>
                <MethodName update={update} submitted={updateSubmit} details={updatedDetails} handleChange={(e) => onHandleUpdate(e,'methodName')} />
            </div>
            </>
        )
        : (
            <>
            <h3 className='p-pt-4 p-pl-5'>Adding Personalization Configurations</h3> 
            <div className='p-grid p-col p-m-1'>
                {details.map((detail,i) => (
            <div className='p-d-flex p-field p-p-2 p-fluid'>
                    <Type submitted={submitted} details={detail} allPersonalization={personalization} handleChange={(e) => onHandleChange(e,i,'type')} />
                    <ClassName submitted={submitted} details={detail} handleChange={(e) => onHandleChange(e,i,'className')} />
                    <MethodName submitted={submitted} details={detail} handleChange={(e) => onHandleChange(e,i,'methodName')} />
                    <div className='p-col-1 p-pt-5 p-ml-3 button-style' >
                                { i ? 
                                <Button icon="pi pi-minus" className=" p-button-outlined p-button-danger " onClick={() => onDeleteDetails(i)} />
                                :
                                <Button icon="pi pi-plus" className=" p-button-outlined " onClick={() => onAddingDetails()} /> 
                            }
                            </div>
                   </div>                     
                ))}            
        </div>
            <div className='p-d-flex p-jc-end p-pr-2'>
                <div className='p-p-1'>
                    <Link to='/personalization/personalizationConfiguration' style={{textDecoration:'none'}}  ><Button className='p-button-secondary' label="Cancel"/></Link>
                </div>
                <div className='p-p-1'>
                  <Button onClick={onDetailsSubmit} label="Save"/>
                </div>
            </div>
            </> 
        )
    } 
          
            </> 
    )
}

export default AddPersonalization
