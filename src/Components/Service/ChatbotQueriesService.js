import axios from 'axios'

export default class ChatbotService {
	baseURI = process.env.REACT_APP_CHATBOT_QUERIES_URL

	getconfig(auth, email) {
		return {
			headers: {
				"Authorization": auth,
				"audience": "http://dolphinsindia.com",
				"emailId": email
			},
		}
	}
	getEmail(email) {
		return {
			headers: {
				"emailId": email
			},
		}
	}
	validateEmail(auth, email) {
		const config = this.getconfig(auth, email)
		return axios.post(
			`${this.baseURI}/chatbot_apis/validateEmailForgotPassword`,
			config
		)
	}
	validateOtp(body) {
		return axios.post(
			`${this.baseURI}/chatbot_apis/validateOTPForgotPassword`,
			body,
		)
	}
	resetPassword(email, body) {
		const config = this.getEmail(email)
		return axios.post(
			`${this.baseURI}/chatbot_apis/resetPassword`, config,
			body
		)
	}
}
