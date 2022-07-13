<template>
    <div> {{ message }} </div>
    <div> {{ appUrl }} </div>
    
    <form v-on:submit.prevent="handleSubmit">    
        <input type="text" name="username" v-model="username"/>
        <input type="password" name="password" v-model="password" />
        <button> 
            Submit
        </button>
    </form>
    <div>
        {{ token }}
    </div>
    
    <form v-on:submit.prevent="getSomething">    
        <button> 
            Get Currency
        </button>
    </form>
    
    <form v-on:submit.prevent="getWebsites">    
        <button> 
            Get Websites
        </button>
    </form>
    
    <form v-on:submit.prevent="getStoreConfigs">    
        <button> 
            Get Store Configs
        </button>
    </form>
    
    <form v-on:submit.prevent="getApiUrl">    
        <button> 
            Get Api Url
        </button>
    </form>
    
    <div v-for="item in apiInformation" :key="item.code">
        
        <div class="container">
            <div class="name">
                {{ item.name }}
            </div>
            <div class="store-code">
                {{ item.code }}
            </div>
            <div class="api-endpoint">
                {{ item.apiendpoint }}
            </div>
        </div>
        <br>

    </div>
        
        
    

</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    // refs
    const message = ref('')
    const username = ref('')
    const password = ref('')
    const token = ref('')
    //const appUrl = ref('https://local.chemcentral.com')
    const appUrl = ref('https://local.univarsolutions.com')
    const apiInformation = ref('')
        
    const handleSubmit = function() {


        console.log(username.value)
        console.log(password.value)
        
            
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        var data = new FormData();

        data.append("username", username.value);
        data.append("password", password.value);
        
        const url = `${appUrl.value}/rest/V1/integration/admin/token`;
        axios.post(url, data, axiosConfig)
        .then((response) => {
            
            localStorage.setItem('mg-admin-token', response.data);
            localStorage.setItem('mg-username', username.value);
            token.value = response.data
        })
        .catch((err) => {
            console.log(err)
        });

    }
    
    const getSomething = function() {
        const url = `${appUrl.value}/rest/V1/directory/currency`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
        });
    }
    
    const getWebsites = function() {
        
        const url = `${appUrl.value}/rest/default/V1/store/websites`;
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mg-admin-token')}`
            }
        };        
        axios.get(url, axiosConfig)
        .then((response) => {
            console.log(response.data);
        });
    }
    
    const getStoreConfigs = function() {
        
        const url = `${appUrl.value}/rest/default/V1/store/storeConfigs`;
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mg-admin-token')}`
            }
        };        
        axios.get(url, axiosConfig)
        .then((response) => {
            console.log(response.data);
        });
        
    }
    
    const getApiUrl = function() {
        
        const url = `${appUrl.value}/rest/V1/api-information/post/?param=dasd`;
    
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mg-admin-token')}`
            }
        };
        
        axios.get(url, axiosConfig)
        .then((response) => {
            apiInformation.value = response.data;
            console.log(response.data);
        });
        
    }
    
    

    return { message, handleSubmit, getSomething, getWebsites, getStoreConfigs, getApiUrl, username, password, token, appUrl, apiInformation}
  }
}
</script>