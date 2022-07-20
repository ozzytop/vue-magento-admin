<template>
    <a-checkbox-group @change="emitDataToParent" v-model:value="checkboxValue" name="checkboxgroup" :options="storeOptions" />
</template>
<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { CheckboxGroup } from 'ant-design-vue'

export default {
    setup(props, context) {
        // refs
        //const appUrl = ref('https://local.chemcentral.com')
        const appUrl = ref('https://local.univarsolutions.com')
        const storeOptions = ref([])
        const checkboxValue = ref('')
            
        
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
        
        const emitDataToParent = () => {
            context.emit('sendStoresArray', checkboxValue.value)
        }
        
        return { appUrl, storeOptions, checkboxValue, emitDataToParent}
    
    }, 
    components: {
        ACheckboxGroup: CheckboxGroup
    }
}
</script>   