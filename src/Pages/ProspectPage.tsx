import { Input, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../config";
import { IProspect } from "../interfaces/prospects/prospects.interface";
import { serverFetch } from "../utils/handleRequest";
import { capitalizeNames } from "../utils/helper";

interface DataType {
  key?: React.Key;
  _id?: string
  firstName?: string;
  lastName?: string;
  email?: string;
  stage: string;
}

const customPaginationConfig = {
  showSizeChanger: false, // Hide page size changer
  showQuickJumper: false, // Hide quick jumper
  showTotal: () => "", // Hide the total count
  // You can customize other pagination options as needed
};

const DealsPage = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [searchedText, setSearchedText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const navigate = useNavigate()
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
      title: "Stage",
      dataIndex: "stage",
      filters: [
        {
          text: "Motivational Interview",
          value: "Motivational Interview",
        },
        {
          text: "Technical Interview",
          value: "Technical Interview",
        },
        {
          text: "Coding Assignment",
          value: "Coding Assignment",
        },
        {
          text: "Coding Assignment Passed",
          value: "Coding Assignment Passed",
        },
        {
          text: "Enrolled",
          value: "Enrolled",
        },
      ],
      onFilter: (value: any, record) => {
        console.log("Filter Value:", value);
        console.log("Record Stage:", record.stage);
        return record.stage === value;
      },
    },
  ];
  const fetchData = async () => {
    try {
      setLoading(true);
      
      url = `${conf.API_BASE_URL}/prospect/all`;
      const data: IProspect[] = await serverFetch("get", url);
     

      // Convert the data to the table format.
      const list: DataType[] = data.map((el, i) => {
        return {
          key: i,
          _id: el._id,
          firstName: el.first_name,
          lastName: el.last_name,
          email: el.email,
          stage: capitalizeNames(el.stage),
        };
      });
      console.log("data", list)
      setTableData(list)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      displayErrorMessage("An error occurred while fetching leads.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    _extra
  ) => {
   const filteredValues = Object.values(filters);
   if (filteredValues.length > 0) {
     const filtered = tableData.filter((record) => {
       return filteredValues.every((value) => value?.includes(record.stage));
     });
     console.log("filtered", filtered)
     setFilteredData(filtered);
   } else {
     setFilteredData([]);
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
          dataSource={filteredData.length > 0 ? filteredData : tableData}
          onChange={onChange}
          pagination={customPaginationConfig}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/prospect/${record._id}`);
            },
          })}
        />
      </div>
    </div>
  );
};

export default DealsPage;
