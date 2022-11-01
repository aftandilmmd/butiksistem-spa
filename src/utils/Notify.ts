import { Notify } from 'quasar'

export function positiveNotify(message = 'İşlem başarılı.'){
  Notify.create({ type: 'positive', position: 'top', message })
}

export function negativeNotify(message = 'İşlem başarısız.'){
  Notify.create({ type: 'negative', position: 'top', message })
}
