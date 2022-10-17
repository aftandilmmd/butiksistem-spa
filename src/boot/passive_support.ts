import { boot } from 'quasar/wrappers'
import { passiveSupport } from 'passive-events-support/src/utils'


export default boot(() => {
  passiveSupport({
    events: ['touchstart', 'touchmove']
  })
})
