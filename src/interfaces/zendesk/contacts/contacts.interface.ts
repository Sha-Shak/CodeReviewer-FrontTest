import { IContactData } from './contacts.data.interface';
import { IContactMeta } from './contacts.meta.interface';

export interface IContact {
  data: IContactData;
  meta: IContactMeta;
}
