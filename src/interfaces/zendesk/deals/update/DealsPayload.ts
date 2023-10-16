export interface IDealsPayload {
  data: IData;
}

export interface IData {
  custom_fields: ICustomFields;
}

export interface ICustomFields {
  Converted: string;
}
