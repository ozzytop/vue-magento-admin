<template>
    <a-layout style="min-height: 100vh">    
        <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo" />
        <a-menu @select="menuSelected" theme="dark" mode="inline">
            <a-menu-item key="1">
            <pie-chart-outlined />
            <span>API Urls</span>
            </a-menu-item>
            <a-menu-item key="2">
            <desktop-outlined />
            <span>API Status</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
            <template #title>
                <span>
                <user-outlined />
                <span>User</span>
                </span>
            </template>
            <a-menu-item key="3">Tom</a-menu-item>
            <a-menu-item key="4">Bill</a-menu-item>
            <a-menu-item key="5">Alex</a-menu-item>
            </a-sub-menu>
        </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-header>a-header</a-header>
            <template v-if="selectedKeys == 1">
                <a-content>
                    <Config />
                </a-content>
            </template>
            <template v-if="selectedKeys == 2">
                <a-content>
                    <Status />
                </a-content>
            </template>
            <a-footer>Copyright © Univar Solutions, Inc. All rights reserved.</a-footer>
        </a-layout>

    </a-layout>
</template>

<script>
import Config from './components/Config.vue'
import Status from './components/Status.vue'
import { ref } from 'vue'
import { Layout, LayoutHeader, LayoutSider, LayoutContent, LayoutFooter, Menu, SubMenu, MenuItem } from 'ant-design-vue'

export default {
  name: 'App',
  setup(){
    
    const selectedKeys = ref('')

    const menuSelected = (item) => {
        selectedKeys.value = item.key
    }
    
    return {
        menuSelected, selectedKeys
    }
  },
  components: {
    Config,
    Status,
    ALayout: Layout,
    ALayoutSider: LayoutSider,
    AHeader: LayoutHeader,
    AContent: LayoutContent,
    AFooter: LayoutFooter,
    AMenu: Menu,
    ASubMenu: SubMenu,
    AMenuItem: MenuItem
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
