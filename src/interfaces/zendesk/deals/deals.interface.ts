import { IDealsData } from './deals.data.interface';
import { IDealsMeta } from './deals.meta.interface';

export interface IDeals {
  data: IDealsData;
  meta: IDealsMeta;
}

export interface IDealsDataList {
  items: IDeals[];
  meta: any; 
}
