import { useEffect, useState } from 'react'
import SprintPairs from '../Components/SprintPairs'
import { ICohort } from '../interfaces/student/cohort.interface';
import { serverFetch } from '../utils/handleRequest';
import conf from '../config';
import { Spin, Switch, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';

function CohortPage() {

  const [messageApi, contextHolder] = message.useMessage();

  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleLoading, setToggleLoading] = useState<{cohortId: string, loading: boolean}[]>([]);

  const displayMessage = (type: "success"| "info" | "error", message: string) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        setLoading(true);
        const allCohortUrl = conf.API_BASE_URL + '/cohort/';
        const cohorts: ICohort[] = await serverFetch('get', allCohortUrl);
        setCohorts(cohorts);

        const loadings = cohorts.map(cohort => ({cohortId: cohort._id, loading: false}));
        setToggleLoading(loadings);

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        displayMessage('error', 'An error occured while fetching cohorts.')
        console.log("error", error.message);
      }
    };
    
    fetchCohorts();
  }, []);

  async function toggleLiveStatus (id: string) {
    try {
      changeToggleLoadingForCohort(id, true);
      const newStatus = (!cohorts[cohorts.findIndex(cohort => cohort._id === id)].live) ? 'active' : 'inactive';
      const url = `${conf.API_BASE_URL}/cohort/live/${newStatus}/${id}`;
      const updatedCohort : ICohort = await serverFetch('put', url);
      const newCohorts = cohorts.map(cohort => cohort._id === updatedCohort._id ? updatedCohort : cohort);
      setCohorts(newCohorts);
      changeToggleLoadingForCohort(id, false);
    } catch (error) {
      changeToggleLoadingForCohort(id, false);
      displayMessage('error', 'An error occured while changing cohort status.')
    }
  }


  function changeToggleLoadingForCohort (id: string, value: boolean) {
    const prevState = [...toggleLoading];
    const newState = prevState.map(item => item.cohortId === id ? {...item, loading: value} : item);
    setToggleLoading(newState);
  }


  const columns : ColumnsType <ICohort> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30%",
      align: 'center',
      render: item => item.split(' ')[2],
    },
    {
      title: "Status",
      dataIndex: "live",
      width: "30%",
      align: 'center',
      render: item => item ? 'Live ⭐' : 'Inactive',
    },
    {
      title: "Action",
      dataIndex: '_id',
      width: "30%",
      align: 'center',
      render: item => <Switch 
        defaultChecked={cohorts[(cohorts.findIndex(cohort => cohort._id === item))].live} 
        checkedChildren='Live' 
        unCheckedChildren='Inactive'
        onChange={() => toggleLiveStatus(item)}
        loading={toggleLoading[toggleLoading.findIndex(load => load.cohortId === item)].loading} 
      />
    },
  ]
  
  return (
    <Spin spinning={loading}>
      <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {contextHolder}
        <SprintPairs cohorts={cohorts} />

        <Table columns={columns} dataSource={cohorts} rowKey='_id' style={{ width: '50dvw'}} />
      </div>
    </Spin>
  )
}

export default CohortPage