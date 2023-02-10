import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import trend from './trend'
import notification from './notification'
import notificationList from './notificationList'
import menu from './menu'
import progress from './progress'
import chooseTime from './chooseTime'
import chooseDate from './chooseDate'
import chooseCity from './chooseCity'
import form from './form'
import modelForm from './modelForm'
import table from './table'
import calendar from './calendar'

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  notificationList,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  form,
  modelForm,
  table,
  calendar
]

export default {
  install(app: App) {
    components.forEach(item=>{
      app.use(item)
    })
  }
}