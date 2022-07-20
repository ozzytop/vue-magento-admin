import { ref } from 'vue'
import axios from 'axios'

const error = ref(null)
const apiInformation = ref('')
    
// composable for making requests
const getRequest =  ( selectValue ) => {
    
    //apiLoading.value = true;
    const url = `https://local.univarsolutions.com/rest/V1/api-information/post/?param=${selectValue.value}`;

    let axiosConfig = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('mg-admin-token')}`
        }
    };
    
    axios.get(url, axiosConfig)
    .then((response) => {
        apiInformation.value = response.data;
        console.log(response.data);
    })
    .catch((err) => {
        error.value = err
        console.log(err) 
    })
    .then(() => {
        //apiLoading.value = false;
    });
    
    
}

const useConfig = () => {
    return { error, getRequest }
}

export default useConfig