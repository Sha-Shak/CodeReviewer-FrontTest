import { Input, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import conf from "../config";
import { IContactList } from "../interfaces/zendesk/contacts/contacts.interface";
import { serverFetch } from "../utils/handleRequest";

interface DataType {
  key?: React.Key;
  firstName: string;
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

const customPaginationConfig = {
  showSizeChanger: false, // Hide page size changer
  showQuickJumper: false, // Hide quick jumper
  showTotal: () => "", // Hide the total count
};

const DealsPage = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [fetchedPages, setFetchedPages] = useState<number[]>([]); // Keep track of fetched pages

  let url = `${conf.API_BASE_URL}/zen/getdata/leads/pending%20pre-screening%20test`;

  const displayErrorMessage = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstName",

      filteredValue: [searchedText],
      onFilter: (value: any, record) =>
        String(record.firstName).toLowerCase()?.includes(value.toLowerCase()),
    },

    {
      title: "Last Name",
      dataIndex: "lastName",

      filteredValue: [searchedText],
      onFilter: (value: any, record) =>
        String(record.firstName).toLowerCase()?.includes(value.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "status",
      dataIndex: "status",
      width: "20%",
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
      onFilter: (value: any, record) =>
        record.gender?.startsWith(value) ?? false,
      filterSearch: true,
    },
    {
      title: "Coder Byte",
      dataIndex: "screeningTest",
      width: "20%",
    },
  ];
  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      if (page) {
        url = `${conf.API_BASE_URL}/zen/getdata/leads/passed%20pre-screening?page=${page}&pageSize=25`;
        setFetchedPages([...fetchedPages, page]);
      }
      console.log("Fetching data for page", page);

      const data: IContactList = await serverFetch("get", url);
      const dataProps = data.items.map((element) => element.data);

      // Convert the data to the table format.
      const tableData: DataType[] = dataProps.map((el, i) => {
        return {
          key: i,
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

      if (!fetchedPages.includes(page)) {
        // Append new data to tableData if it's not already fetched
        setTableData((prevData) => [...prevData, ...tableData]);
        setFetchedPages([...fetchedPages, page]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      displayErrorMessage("An error occurred while fetching leads.");
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
    console.log("params", pagination, filters, sorter, extra);

    if (pagination.current) {
      if (!fetchedPages.includes(pagination.current)) {
        fetchData(pagination.current);
      }
    }
  };

  return (
    <div className="dealBody">
      <div className="tableBody">
        <Input.Search
          placeholder="Search here..."
          style={{ marginBottom: 9, width: "20%" }}
          onSearch={(value) => setSearchedText(value)}
        />
        {contextHolder}
        <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          pagination={customPaginationConfig}
        />
      </div>
    </div>
  );
};

export default DealsPage;
