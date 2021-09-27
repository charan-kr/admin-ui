import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChatbotQueriesService from '../../Service/ChatbotQueriesService'

const ForgetPassword = ({ steps, previousStep, triggerNextStep, closeChat }) => {
    const chatbotService = new ChatbotQueriesService()
    const email = steps['validate-email'].value
    useEffect(() => {
        if (previousStep.id === 'validate-email') {
            const auth = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJzY29wZXMiOlsiUk9MRV9BRE1JTiJdLCJpc3MiOiJodHRwOi8vZG9scGhpbnNpbmRpYS1sb2NhbC5jb20iLCJhdWQiOiJodHRwOi8vZG9scGhpbnNpbmRpYS5jb20iLCJpYXQiOjE2MzE2OTAxMzgsImV4cCI6MTYzMTY5MzczOH0.lXR911Dh3mT7ZwjMNb5JMwaUK15kOxWQRsvFwf4z1DoUfc4Ll8IaoPF_9c2eTj3InpL7KUmYa0gIGSxdjnCbog'
            chatbotService.validateEmail(auth, email).then(() => {
                setTimeout(() => {
                    triggerNextStep()
                }, 1000)
            }).catch((err) => {
                if (err) {
                    const obj = {
                        value: 'server-problem',
                        trigger: 'server-problem-msg'
                    }
                    triggerNextStep(obj)
                    console.log(err)
                }
            })
        }
        if (previousStep.id === 'validate-otp') {
            const body = {
                email,
                otp: previousStep?.value
            }
            chatbotService.validateOtp(body).then(() => {
                setTimeout(() => {
                    triggerNextStep()
                }, 2000)
            }).catch((err) => {
                if (err) {
                    const obj = {
                        value: 'server-problem',
                        trigger: 'server-problem-msg'
                    }
                    triggerNextStep(obj)
                    console.log(err)
                }
            })
        }
        if (previousStep.id === 're-enter-password') {
            const body = {
                newPassword: steps['new-password'].value,
                reEnterNewPassword: steps['re-enter-password'].value
            }
            chatbotService.resetPassword(email, body).then(() => {
                setTimeout(() => {
                    triggerNextStep()
                }, 2000)
            }).catch((err) => {
                if (err) {
                    const obj = {
                        value: 'server-problem',
                        trigger: 'server-problem-msg'
                    }
                    triggerNextStep(obj)
                    console.log(err)
                }
            })
        }

    }, [])




    return <span />
}

ForgetPassword.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};

ForgetPassword.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};


export default ForgetPassword
