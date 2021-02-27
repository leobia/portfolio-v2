import './styles/styles.scss'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(MotionPlugin, {
  directives: {
    'from-left': {
      initial: {
        opacity: 0,
        x: -260
      },
      enter: {
        opacity: 1,
        x: 0
      },
      visible: {
        opacity: 1,
        x: 0
      }
    },
    'from-right': {
      initial: {
        opacity: 0,
        x: 260
      },
      enter: {
        opacity: 1,
        x: 0
      },
      visible: {
        opacity: 1,
        x: 0
      }
    }
  }
})

app.config.globalProperties.$http = axios

app.mount('#app')
