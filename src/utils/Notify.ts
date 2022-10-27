import { Notify } from 'quasar'

export function positiveNotify(message = 'İşlem başarılı.'){
  Notify.create({ type: 'positive', message })
}

export function negativeNotify(message = 'İşlem başarısız.'){
  Notify.create({ type: 'negative', message })
}
