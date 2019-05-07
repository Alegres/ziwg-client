import axios from 'axios'
import { BASE_URL } from '@/constants/api'

export default() => {
    return axios.create({
        baseURL: BASE_URL,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}