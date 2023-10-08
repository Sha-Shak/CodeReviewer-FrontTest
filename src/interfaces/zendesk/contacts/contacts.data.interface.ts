import { IContactAddress } from './contacts.address.interface';
import { IContactCustomFields } from './contacts.customFields.interface';

export interface IContactData {
  id?: number;
  creator_id?: number;
  contact_id?: null;
  created_at?: string;
  updated_at?: string;
  title?: string;
  name?: string;
  first_name: string;
  last_name: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  skype?: string;
  owner_id?: number;
  is_organization?: boolean;
  address?: IContactAddress;
  shipping_address?: IContactAddress;
  billing_address?: IContactAddress;
  industry?: null;
  tags?: string[];
  custom_fields?: IContactCustomFields;
  customer_status?: string;
  prospect_status?: string;
  parent_organization_id?: number;
}
