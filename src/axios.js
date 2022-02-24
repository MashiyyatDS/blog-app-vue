import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.baseURL = 'https://mm-blog-app.herokuapp.com/'
<<<<<<< HEAD
axios.defaults.headers['Authorization'] = "Bearer " + localStorage.getItem('token')
=======
axios.defaults.headers['Authorization'] = "Bearer " + localStorage.getItem('token')
>>>>>>> 39914572a3f3b2d68a48ff3a9575fb622a87b166
