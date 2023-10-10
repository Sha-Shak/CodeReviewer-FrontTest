import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { IContactData } from "../interfaces/zendesk/contacts/contacts.data.interface";
import { IContactList } from "../interfaces/zendesk/contacts/contacts.interface";
import { IContactMeta } from "../interfaces/zendesk/contacts/contacts.meta.interface";
import { serverFetch } from "../utils/handleRequest";

interface DataType {
  key?: React.Key;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: string;
  age?: number;
  gender?: string;
  location?: string;
  screeningTest?: string;
  converted?: string;
  prExperience?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "First Name",
    dataIndex: "firstName",
    width: "20%",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "30%",
  },
  {
    title: "status",
    dataIndex: "status",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => {
      const ageA = a.age ? Number(a.age) : 0;
      const ageB = b.age ? Number(b.age) : 0;
      return ageA - ageB;
    },
  },
  {
    title: "Location",
    dataIndex: "Location",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    onFilter: (value: any, record) => record.gender?.startsWith(value) ?? false,
    filterSearch: true,
  },
  {
    title: "Coder Byte",
    dataIndex: "screeningTest",
  },
];

const DealsPage = () => {
  const [deals, setDeals] = useState({} as IContactData[]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [meta, setMeta] = useState({} as IContactMeta);
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const url =
    "https://code-reviewer-server-projectcode.koyeb.app/zen/getdata/leads/won"; //`${apiUrl}/zen/deals`;

  useEffect(() => {
    const fetchData = async () => {
      const data: IContactList = await serverFetch("get", url);
      const dataProps = data.items.map((element) => element.data);
      setDeals(dataProps);

      // Convert the data to the table format.
      const tableData: DataType[] = dataProps.map((el) => {
        return {
          firstName: el.first_name,
          lastName: el.last_name,
          age: Number(el.custom_fields.Age),
          gender: el.custom_fields.Gender,
          prExperience: el.custom_fields["Programming Experience"],
          email: el.email,
          status: el.status,
          location: el.custom_fields.Location,
          screeningTest: el.custom_fields["Pre-Screening Score"],
        };
      });

      setTableData(tableData);
      setMeta(data.meta);
    };

    fetchData();
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="dealBody">
      <Table columns={columns} dataSource={tableData} onChange={onChange} />
    </div>
  );
};

export default DealsPage;
