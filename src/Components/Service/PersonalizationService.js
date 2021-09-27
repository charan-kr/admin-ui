import axios from 'axios'

export class PersonalizationService {
      baseURI  = process.env.REACT_APP_PERSONALIZATION_URL
      
      getPersonalization = async () => {
            return await axios.get(`${this.baseURI}/personalizationconfigurations`)
      }
      getOnePersonalization = async (id) => {
            return await axios.get(`${this.baseURI}/personalizationconfig/${id}`)
      }
      postPersonalization = async (data) => {
            return await axios.post(`${this.baseURI}/personalizationconfig`,data)             
      } 
      updatePersonalization = async (id,body) => {
            return await axios.put(`${this.baseURI}/personalizationconfig/${id}`,body)
      }      
      deletePersonalization = async (id) => {
            return await axios.delete(`${this.baseURI}/personalizationconfig/${id}`)
      }
 
    
}


