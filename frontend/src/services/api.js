// Base URL: http://ec2-18-233-169-206.compute-1.amazonaws.com:3000/

import axios from "axios";

const api = axios.create({
    baseURL: "http://ec2-18-233-169-206.compute-1.amazonaws.com:3000/"
})

// const api = axios.create({
//     baseURL: "http://localhost:3001/"
// })

export default api;