import React, { useState, useEffect } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import botAvatar from '../../static/media/images/title_image.png'
import ProductCheck from './Components/ProductCheck'
import Error from './Components/Error'
import LoginCheck from './Components/LoginCheck'
import ListItem from './Components/ListItem'
import TrackingStatus from './Components/TrackingStatus'
import Feedback from './Components/Feedback'
import { ChatbotService } from '../Service/ChatbotService'
import { useToast } from '../../hooks/useToast'
import { STEP_TYPES } from '../../utils/constants'
import ForgetPassword from './Components/ForgetPassword'

const theme = Object.freeze({
    background: '#f5f8fb',
    fontFamily: 'Segoe UI',
    headerBgColor: '#2198D0',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#2198D0',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#2198D0',
})

const config = {
    width: '410px',
    height: '460px',
    floating: true,
    botDelay: 2000,
    botAvatar: botAvatar,
    userDelay: 0,
}

const Chatbot = () => {
    const [loading, setLoading] = useState(true)
    const [opened, setOpened] = useState(false)
    const [steps, setSteps] = useState([])
    const toast = useToast()

    const chatbotService = new ChatbotService()

    useEffect(() => {
        setLoading(false)
        chatbotService
            .getChatbotSteps()
            .then(res => {
                setSteps(componentMapping(res.data))
            })
            .catch(err => {
                if (err.response?.status === 400) {
                    toast({
                        severity: 'error',
                        summary: err?.response?.data?.message,
                        detail: 'empty',
                    })
                }
            })
        // eslint-disable-next-line
    }, [])

    const handleFloat = () => {
        setOpened(true)
    }
    const handelFloatClose = () => {
        setOpened(false)
    }

    const handleEnd = () => {
        setTimeout(() => {
            setLoading(false, () => {
                setLoading(true)
            })
        }, 500)
    }

    const componentsData = {
        ListItem: <ListItem />,
        Error: <Error />,
        LoginCheck: <LoginCheck />,
        ProductCheck: <ProductCheck />,
        TrackingStatus: <TrackingStatus />,
        Feedback: <Feedback closeChat={handelFloatClose} />,
        ForgetPassword: <ForgetPassword closeChat={handelFloatClose} />,
    }

    const componentMapping = data => {
        const mappingComponent = data.map(step => {
            if (Object.keys(step).includes('component')) {
                step.component = componentsData[step.component]
                return step
            }
            return step
        })
        return mappingComponent.flat()
    }

    const headerTemplate = () => {
        return (
            <div
                className='p-p-2 p-grid p-jc-between'
                style={{ backgroundColor: '#2198D0' }}
            >
                <div className=' p-grid'>
                    <img
                        className='p-mt-1'
                        src={botAvatar}
                        alt='dolphinsLogo'
                        style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                    />
                    <label
                        className='p-ml-2 p-pt-4'
                        style={{
                            color: '#f5f8fb',
                            fontSize: '18px',
                            fontFamily: 'Segoe UI',
                        }}
                    >
                        Dolphins India Bot
                    </label>
                </div>
                <div className='p-mb-2'>
                    <i
                        style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
                        className='pi pi-refresh p-mt-4 p-mr-4'
                    />
                    <i
                        onClick={handelFloatClose}
                        style={{ fontSize: '20px', color: '#fff', cursor: 'pointer' }}
                        className='pi pi-times p-mt-4 p-mr-2'
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {!loading ? (
                    steps.length > 0 ? (
                        <ChatBot
                            className='p-grid'
                            avatarStyle={{ marginRight: '5px' }}
                            headerComponent={headerTemplate()}
                            toggleFloating={() => handleFloat(opened)}
                            opened={opened}
                            handleEnd={() => handleEnd()}
                            bubbleOptionStyle={{ backgroundColor: '#fff', color: '#2198D0' }}
                            enableSmoothScroll={true}
                            steps={steps || []}
                            {...config}
                        />
                    ) : (
                        ''
                    )
                ) : (
                    ''
                )}
            </ThemeProvider>
        </>
    )
}

export default Chatbot
