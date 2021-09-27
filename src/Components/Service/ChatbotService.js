import axios from 'axios'

export class ChatbotService {
    baseURI = process.env.REACT_APP_CHATBOT_URL

    getChatbotAllSteps = async () => {
        return await axios.get(`${this.baseURI}/chatbot/allSteps`)
    }
    getChatbotSteps = async () => {
        return await axios.get(`${this.baseURI}/chatbot/allStepsCustomised`)
    }
    getOneChatbotSteps = async (id) => {
        return await axios.get(`${this.baseURI}/chatbot/step?id=${id}`)
    }
    postChatbotSteps = async (body) => {
        return await axios.post(`${this.baseURI}/chatbot/step`, body)
    }
    updateChatbotSteps = async (body) => {
        return await axios.put(`${this.baseURI}/chatbot/step`, body)
    }
    deleteChatbotSteps = async (id) => {
        return await axios.delete(`${this.baseURI}/chatbot/step?id=${id}`)
    }


}


