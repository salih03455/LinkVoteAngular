export interface Template {
  notificationStatus?: boolean; // notification'u goster / gizle
  notificationTitle?: string; // eklenen / silinen seyin adi
  notificationFunction?: string; // added, deleted, changed vs
  notificationType?: string; // error, success vs
  modalStatus?: boolean; // modal'i goster / gizle
  modalContinue?: boolean; // modal uzerinde; tamam / vazgec
}