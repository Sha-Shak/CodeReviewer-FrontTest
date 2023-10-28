import { Select, Spin } from 'antd';
import { parseName } from '../../utils/helper';
import { useEffect, useState } from 'react';
import conf from '../../config';
import { IStudent } from '../../interfaces/student/student.interface';
import { serverFetch } from '../../utils/handleRequest';
import Table, { ColumnsType, TableProps } from 'antd/es/table';
import { StarTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ICohort } from '../../interfaces/student/cohort.interface';

function StudentTable() {
  const types = ['pre-course', 'junior', 'senior', 'alumni'];

  const [selectedType, setSelectedType] = useState<string>('junior');
  const [students, setStudents] = useState<(IStudent & {cohortInfo: ICohort})[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()

  async function fetchStudents() {
    try {
      setLoading(true);
      const url = `${conf.API_BASE_URL}/students/type/${selectedType}`;
      const res: (IStudent & {cohortInfo: ICohort})[] = await serverFetch('get', url);
      setStudents(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [selectedType])

  const onChange: TableProps<(IStudent & {cohortInfo: ICohort})>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  
  const columns: ColumnsType<(IStudent & {cohortInfo: ICohort})> = [
    {
      title: "Model",
      dataIndex: "model",
      render: item => item ? <StarTwoTone twoToneColor="#8884d8" /> : ""
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Github",
      dataIndex: "ghUserName",
    },
    {
      title: "Cohort",
      dataIndex: "cohortInfo",
      render: item => item.name.split(' ')[2]
    }
  ];

  return (
    <div className="table-container">
      Student type:
      <Select
        options={types.map(type => ({ label: parseName(type), value: type }))}
        onChange={(value: string) => setSelectedType(value)}
        defaultValue="junior"
        style={{marginLeft: 10}}
      />

      <Spin spinning={loading} tip="Fetching students..." size="large" >
        <Table columns={columns} dataSource={students} onChange={onChange} rowKey='_id' onRow={(record) => ({
          onClick: () => {
            navigate(`/profile/${record._id}`)
          }
        })} />
      </Spin>

    </div>
  )
}

export default StudentTable