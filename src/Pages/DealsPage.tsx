import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { IDealsData } from "../interfaces/zendesk/deals/deals.data.interface";
import { IDealsDataList } from "../interfaces/zendesk/deals/deals.interface";
import { IDealsMeta } from "../interfaces/zendesk/deals/deals.meta.interface";
import { serverFetch } from "../utils/handleRequest";


interface DataType {
  key?: React.Key;
  name?: string;
  age?: number;
  gender?: string;
  cohortYear?: string;
  cohortMonth?: string;
  converted?: string;
  prExperience?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Cohort Month",
    dataIndex: "cohortMonth",
    width: "20%",
  },
  {
    title: "Cohort Year",
    dataIndex: "cohortYear",
    width: "20%",
  },
  {
    title: "Programming Experinece",
    dataIndex: "prExperience",
    width: "30%",
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
    title: "Converted",
    dataIndex: "converted",
    filters: [
      {
        text: "True",
        value: "true",
      },
      {
        text: "False",
        value: "false",
      },
    ],
    onFilter: (value: any, record) => record.converted?.startsWith(value) ?? false ,
    filterSearch: true,
  },
];

const DealsPage = () => {
  const [deals, setDeals] = useState({} as IDealsData[]);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [meta, setMeta] = useState({} as IDealsMeta);

  const url =
    "https://code-reviewer-server-projectcode.koyeb.app/zen/getdata/deals"; //`${apiUrl}/zen/deals`;

  useEffect(() => {
    const fetchData = async () => {
      const data: IDealsDataList = await serverFetch("get", url);
      const dataProps = data.items.map((element) => element.data);
      setDeals(dataProps);

      // Convert the data to the table format.
      const tableData: DataType[] = dataProps.map((el, i) => {
        return {
          name: el.name,
          age: Number(el.custom_fields.Age),
          gender: el.custom_fields.Gender,
          prExperience: el.custom_fields?.["Programming Experience"],
          converted: el.custom_fields.Converted,
          cohortMonth: el.custom_fields?.["Cohort Month"],
          cohortYear: el.custom_fields?.["Cohort Year"],
        };
      });

      setTableData(tableData);
      console.log("from deals ", tableData);
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
      
      <div className="tableBody">
        <Table columns={columns} dataSource={tableData} onChange={onChange} />
      </div>
    </div>
  );
};

export default DealsPage;
