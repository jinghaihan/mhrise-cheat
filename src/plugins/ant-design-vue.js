import Vue from 'vue'

import {
  Layout,
  Icon,
  Menu,
  Tabs,
  Dropdown,
  Spin,
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Select,
  InputNumber,
  Table,
  ConfigProvider,
  message,
  Tooltip,
  Card
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.use(Layout)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(Tabs)
Vue.use(Dropdown)
Vue.use(Spin)
Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Select)
Vue.use(InputNumber)
Vue.use(Table)
Vue.use(ConfigProvider)
Vue.use(message)
Vue.use(Tooltip)
Vue.use(Card)
