import { Dialog } from 'quasar';

function confirmDialog({ title = 'Uyarı', message = 'Devam istediğinize emin misiniz?' } =  {}): Promise<void> {

  return new Promise((resolve, reject): void => {

    Dialog.create({
      title,
      message,
      cancel: {
          flat: true,
          label: 'İptal',
          unelevated: true,
      },
      ok: {
          flat: true,
          label: 'Sil',
          unelevated: true,
      },
    })
    .onOk(() => resolve())
    .onCancel(() => reject('reject'))
    .onDismiss(() => reject('dismiss'));

  });

}

export { confirmDialog };
