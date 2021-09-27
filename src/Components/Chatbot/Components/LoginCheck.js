import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import AuthService from '../../../Components/Service/AuthService'
import logo from '../../../static/media/images/logo_5_wo_bg.png'

const LoginCheck = ({ triggerNextStep, step }) => {
	const [isLogged] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitted, setSubmitted] = useState(false)
	useEffect(() => {
		if (isLogged) {
			triggerNextStep()
		}
	}, [triggerNextStep])

	const handleLogin = () => {
		setSubmitted(true)
		let valid = email && password
		if (valid) {
			triggerNextStep()
		}
	}

	return (
		<div>
			{isLogged ? (
				step.message
			) : (
				<>
					<h2 className='p-text-center'>
						<img
							className='p-ml-6'
							src={logo}
							alt='logo'
							style={{ height: '50px', width: '150px' }}
						/>
					</h2>
					<div className='p-grid p-ai-center p-fluid '>
						<div className='p-col-2 p-mr-5 p-mb-3'>
							<label>Email</label>
						</div>
						<div className='p-col p-mb-2'>
							<span className='p-input-icon-right'>
								<i className='pi pi-envelope' />
								<InputText
									className='p-pr-3'
									name='email'
									type='email'
									className={submitted && !email && 'p-invalid'}
									value={email}
									onChange={e => setEmail(e.target.value)}
									placeholder='Your email'
								/>
							</span>
							{submitted && !email && (
								<small className='p-error'>Required</small>
							)}
						</div>
					</div>
					<div className='p-grid p-fluid'>
						<div className='p-col-2 p-mr-5 p-mt-3'>
							<label>Password</label>
						</div>
						<div className='p-col p-mt-2 p-mb-2'>
							<Password
								name='password'
								type='password'
								className={submitted && !password && 'p-invalid'}
								value={password}
								toggleMask
								feedback={false}
								onChange={e => setPassword(e.target.value)}
								placeholder='Your password'
							/>
							{submitted && !password && (
								<small className='p-error'>Required</small>
							)}
						</div>
					</div>
					<div className='p-text-center p-pt-1'>
						<Button
							className='p-button-success'
							onClick={handleLogin}
							label='Login'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default LoginCheck
