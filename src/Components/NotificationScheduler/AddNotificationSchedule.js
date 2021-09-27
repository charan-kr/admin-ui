import React,{useState,useRef} from 'react'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Link, useHistory } from 'react-router-dom';
import Name from './Details/Name';
import Cc from './Details/Cc';
import To from './Details/To';
import Bcc from './Details/Bcc';
import Template from './Details/Template';
import ModelClass from './Details/ModelClass';
import ModelClassMethod from './Details/ModelClassMethod';
import Type from './Details/Type';
import { Divider } from 'primereact/divider';
import CustomBreadcrumbs from '../CustomBreadCrumbs';

const AddNotificationSchedule = ({update,updatedDetails,updateSubmit}) => {
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
    const [detailSchedule,setDetailsSchedule] = useState(initialDetails)
    const history = useHistory()
    const [submitted,setSubmitted] = useState(false)  
    const toast = useRef(null);    

    const onHandleChange = (e,name) => {
        const value = {...detailSchedule}
        value[name]=e.target.value
        setDetailsSchedule(value)
    }

    //  const reset = (prevData) => {
    //     setPersonalization(prevData) 
    //     setDetailsSchedule(initialDetails)
    //     setSubmitted(false)
    // }
     const onDetailsSubmit = () => {
        setSubmitted(true)
        // alert(JSON.stringify(detailSchedule,null,2))
        setTimeout(() => {
            history.push('/notificationScheduler/notification-scheduler-details')                            
            }, 300);
        // reset()
    }
    const breadcrumbs = [
        {
            label: "NotificationSchedulerDetails",
            path: "/notificationScheduler/notification-scheduler-details",
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
        {
            label: "New",
            path: "/notificationScheduler/notification-scheduler-details/add",
            icon: "fa fa-home",
            onlyIcon: false,
            showIcon: false,
        },
];

    return (
        <>
        <Toast ref={toast} />         
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
            <h3 className='p-pt-4 p-pl-4'>Adding Notification Schedule </h3> 
            <div className='p-field p-fluid'>
                <div className='p-grid p-p-2'>
                        <Name name={detailSchedule.name} submitted={submitted}  handleChange={(e) => onHandleChange(e,'name')} /> 
                        <To to={detailSchedule.to} submitted={submitted} handleChange={(e) => onHandleChange(e,'to')} />
                        <Cc cc={detailSchedule.cc} submitted={submitted} handleChange={(e) => onHandleChange(e,'cc')} />
                        <Bcc bcc={detailSchedule.bcc} submitted={submitted} handleChange={(e) => onHandleChange(e,'bcc')} />
                        <Template template={detailSchedule.template} submitted={submitted} handleChange={(e) => onHandleChange(e,'template')} />
                        <ModelClass modelClass={detailSchedule.modelClass} submitted={submitted} handleChange={(e) => onHandleChange(e,'modelClass')} />
                        <ModelClassMethod modelClassMethod={detailSchedule.modelClassMethod} submitted={submitted} handleChange={(e) => onHandleChange(e,'modelClassMethod')} />
                        <Type type={detailSchedule.type} submitted={submitted} handleChange={(e) => onHandleChange(e,'type')} />
                </div>   
            </div>  
            <Divider/>                          
            <div className='p-d-flex p-jc-end p-pr-2'>
                <div className='p-p-1'>
                    <Link to='/notificationScheduler/notification-scheduler-details' style={{textDecoration:'none'}}  ><Button className='p-button-secondary' label="Cancel"/></Link>
                </div>
                <div className='p-p-1'>
                  <Button onClick={onDetailsSubmit} label="Save"/>
                </div>
            </div>
          </>
    )
}

export default AddNotificationSchedule
