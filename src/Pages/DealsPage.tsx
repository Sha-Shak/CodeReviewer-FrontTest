import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { IContactData } from "../interfaces/zendesk/contacts/contacts.data.interface";
import { IContactList } from "../interfaces/zendesk/contacts/contacts.interface";
import { IContactMeta } from "../interfaces/zendesk/contacts/contacts.meta.interface";
import { serverFetch } from "../utils/handleRequest";
import conf from "../config";
import { Spin, message } from "antd";
import { IDealsDataList } from "../interfaces/zendesk/deals/deals.interface";

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
    onFilter: (value: any, record) =>
      record.converted?.startsWith(value) ?? false,
    filterSearch: true,
  },
];

const DealsPage = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  let url = `${conf.API_BASE_URL}/zen/getdata/deals`;
  const [fetchedPages, setFetchedPages] = useState<number[]>([]); // Keep track of fetched pages

  const displayErrorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
        setLoading(true);
        if (page) {
          url = `${conf.API_BASE_URL}/zen/getdata/deals?page=${page}&pageSize=25`;
          setPageNumber(page); // Update the current page number
          setFetchedPages([...fetchedPages, page]);
        }
        const data: IDealsDataList = await serverFetch("get", url);
        const dataProps = data.items.map((element) => element.data);

      const tableData: DataType[] = dataProps.map((el, i) => {
        return {
          key: i,
          name: el.name,
          age: Number(el.custom_fields.Age),
          gender: el.custom_fields.Gender,
          prExperience: el.custom_fields?.["Programming Experience"],
          converted: el.custom_fields.Converted,
          cohortMonth: el.custom_fields?.["Cohort Month"],
          cohortYear: el.custom_fields?.["Cohort Year"],
        };
      });

     
       if (!fetchedPages.includes(page)) {
         // Append new data to tableData if it's not already fetched
         setTableData((prevData) => [...prevData, ...tableData]);
         setFetchedPages([...fetchedPages, page]);
       }

       setLoading(false);
    } catch (error) {
      setLoading(false);
      displayErrorMessage("An error occured while fetching leads.");
    }
  };
  useEffect(() => {
    fetchData(1);
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (pagination.current) {
      if (!fetchedPages.includes(pagination.current)) {
       // fetchData(pagination.current);
      }
    }
  };

  return (
    <div className="dealBody">
      {contextHolder}
      <div className="tableBody">
        <Spin key={1} spinning={loading} tip="Fetching leads..." size="large">
          <Table columns={columns} dataSource={tableData} onChange={onChange} />
        </Spin>
      </div>
    </div>
  );
};

export default DealsPage;
