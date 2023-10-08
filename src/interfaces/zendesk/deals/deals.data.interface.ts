import { IDealsCustomFields } from './deals.customFields.interface';

export interface IDealsData {
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  hot?: boolean;
  currency?: string;
  loss_reason_id?: string;
  source_id?: number;
  creator_id?: number;
  unqualified_reason_id?: string;
  last_stage_change_at?: string;
  last_stage_change_by_id?: number;
  added_at?: string;
  dropbox_email?: string;
  owner_id?: number;
  value?: number;
  stage_id?: number;
  contact_id: number;
  custom_fields?: IDealsCustomFields;
  organization_id?: string;
  estimated_close_date?: string;
  customized_win_likelihood?: string;
  last_activity_at?: string;
  tags?: string[];
}
