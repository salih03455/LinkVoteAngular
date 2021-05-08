export interface Notification {
  status: boolean; // notification'u goster / gizle
  title: string; // eklenen / silinen seyin adi
  function: string; // added, deleted, changed vs
  type: string; // error, success vs
}