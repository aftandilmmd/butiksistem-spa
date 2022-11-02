import { Dialog } from 'quasar';

function confirmDialog({ title = 'Uyarı', message = 'Devam istediğinize emin misiniz?', confirm_label = 'Tamam', persistent = false, html = false} =  {}): Promise<void> {

  return new Promise((resolve, reject): void => {

    Dialog.create({
      title,
      message,
      persistent,
      html,
      cancel: {
        flat: true,
        label: 'İptal',
        unelevated: true,
      },
      ok: {
        flat: true,
        label: confirm_label,
      },
    })
    .onOk(() => resolve())
    .onCancel(() => reject('reject'))
    .onDismiss(() => reject('dismiss'));

  });

}

export { confirmDialog };
