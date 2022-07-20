<template>
    

    <br>
    <button @click="getSomething"> 
        Get Currency Normal
    </button>
    <button @click="getSomethingAsync"> 
        Get Currency Sync Await
    </button>
    
    <button @click="handleComposable"> 
        Handle Composable
    </button>
    
    <a-row>
        <a-col :span="24" :offset="1">
            <a-form layout="inline" v-on:submit.prevent="handleSubmit">
                <a-form-item>
                    <a-input v-model:value="username" placeholder="Username" />
                </a-form-item>
                <a-form-item>
                    <a-input-password v-model:value="password" placeholder="Password" />
                </a-form-item>
                <a-button type="primary" htmlType="submit" :loading="loginLoading">
                    Submit
                </a-button>
            </a-form>
        </a-col>
        <a-col :span="10" :offset="1" >
            <div :style="{ 'margin': '10px 0' }"> {{ message }} </div>
        </a-col>
    </a-row>
    
    
    <div v-if="true">
        <StoreCheckbox v-on:sendStoresArray="getStoresArray"></StoreCheckbox>
    </div>   
    <div v-if="true">
        <br><br>
        <a-row justify="start">
            <a-col :style="{ 'text-align': 'left' }" :span="24" :offset="1">
                
                <a-form layout="inline" v-on:submit.prevent="getApiUrl">
                    
                    
                    <a-select
                        ref="select"
                        style="width: 300px"
                        @focus="focus"
                        @change="handleChange"
                    >
                        <a-select-option value="univar_api/general/base_url">Api Url</a-select-option>
                        <a-select-option value="univar_service_request_api/pricing/api_url">Get Pricing Service Url</a-select-option>
                        <a-select-option value="univar_service_request_api/tax_freight/api_url">Tax and Freight Url</a-select-option>
                    </a-select>
                
                    
                    <a-button htmlType="submit" :loading="apiLoading">
                        Get Url
                    </a-button>

                </a-form>
            </a-col>
        </a-row>
        <br>
        <a-row>
            <a-col :span="22" :offset="1"> 
                <a-table :dataSource="apiInformation" :columns="columns" />
            </a-col>
        </a-row>
    </div>
        
        
    

</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Row, Col, Table, Button, Form, FormItem, Input, InputPassword, Select, SelectOption } from 'ant-design-vue'
import StoreCheckbox from './StoreCheckbox.vue'
import useConfig from './../composables/useConfig'

export default {
  setup() {
    // refs
    const message = ref('')
    const loggedIn = ref(false)
    const username = ref('')
    const password = ref('')
    const token = ref('')
    //const appUrl = ref('https://local.chemcentral.com')
    const appUrl = ref('https://local.univarsolutions.com')
    const apiInformation = ref('')
    const loginLoading = ref(false)
    const apiLoading = ref(false)
    const selectValue = ref('')
    const storeOptions = ref([])
    const checkboxValue = ref('')
        
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
    
        loginLoading.value = true;
        data.append("username", username.value);
        data.append("password", password.value);
        
        const url = `${appUrl.value}/rest/V1/integration/admin/token`;
        axios.post(url, data, axiosConfig)
        .then((response) => {
            localStorage.setItem('mg-admin-token', response.data);
            localStorage.setItem('mg-username', username.value);
            token.value = response.data
            console.log(response.data)
            loggedIn.value = true
            message.value = ''
        })
        .catch((err) => {
            console.log(err)
            message.value = err.response.data.message
        })
        .then(function () {
            loginLoading.value = false;
        });

    }
    
    const getSomething = function() {
        const url = `${appUrl.value}/rest/V1/directory/currency`;
        axios.get(url)
        .then((response) => {
            console.log(response.data);
        });
    }
    
    const getSomethingAsync = async function() {
        const url = `${appUrl.value}/rest/V1/directory/currency`;
        try {
            const res = await axios.get(url)    
            console.log(res.data)
        } catch(err) {
            console.log(err)
        }
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
    
    const getApiUrl = function(params) {
        
        console.log(params)
        apiLoading.value = true;
        const url = `${appUrl.value}/rest/V1/api-information/post/?param=${selectValue.value}`;
    
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
           console.log(err) 
        })
        .then(() => {
            apiLoading.value = false;
        });
        
    }
    
    const { errorComposable, getRequest } = useConfig()
    
    const handleComposable = async () => {
        await getRequest(selectValue)
        //debugger;
        if(!errorComposable.value){
            //context.emit('login')
            console.log('a vper error')
        }
    }
    
    const columns = [
          {
            title: 'Store',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Store Code',
            dataIndex: 'code',
            key: 'code',
          },
          {
            title: 'Api Endpoint',
            dataIndex: 'apiendpoint',
            key: 'apiendpoint',
          },
        ]
        
    const plainOptions = ['Apple', 'Pear', 'Orange'];

    
    const focus = () => {
      console.log('focus');
    };

    const handleChange = (value) => {
      selectValue.value = value
    };
    
    const getStoresArray = (storeArray) => {
        console.log(storeArray)
    }
    
    onMounted(() => {
        console.log('mounted')
        const url = `${appUrl.value}/rest/default/V1/store/websites`;
        let axiosConfig = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('mg-admin-token')}`
            }
        };        
        axios.get(url, axiosConfig)
        .then((response) => {
            storeOptions.value = response.data.map(function(item) {
                return {'label': item.name ,'value': item.code}
            })
            checkboxValue.value = [storeOptions.value[1]['value']]
        });
    })

    return { message, handleSubmit, getSomething, getStoreConfigs, getApiUrl, username, password, token, appUrl, apiInformation, columns, loginLoading, loggedIn, plainOptions, focus, handleChange, apiLoading, getSomethingAsync, errorComposable, handleComposable, storeOptions, checkboxValue, getStoresArray}
  }, 
    components: {
        ACol: Col,
        ARow: Row,
        ATable: Table,
        AButton: Button,
        AForm: Form,
        AFormItem: FormItem,
        AInput: Input,
        AInputPassword: InputPassword,
        ASelect: Select,
        ASelectOption: SelectOption,
        StoreCheckbox
    }
}
</script>   