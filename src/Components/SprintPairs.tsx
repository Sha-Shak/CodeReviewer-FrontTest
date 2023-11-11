import { useEffect, useState } from "react";
import { ICohort } from "../interfaces/student/cohort.interface";
import { Alert, Button, Select, Spin, message } from "antd";
import conf from "../config";
import { serverFetch } from "../utils/handleRequest";
import { IJuniorSprintPair } from "../interfaces/sprint/juniorSprintPair";
import { DownloadOutlined, TeamOutlined } from "@ant-design/icons";

function SprintPairs({ cohorts } : { cohorts: ICohort[]}) {

  const [messageApi, contextHolder] = message.useMessage();

  const [selectedCohort, setSelectedCohort] = useState<string>('');
  const [pairs, setPairs] = useState<IJuniorSprintPair[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [generating, setGenerating] = useState<boolean>(false);

  const displayMessage = (type: "success"| "info" | "error", message: string) => {
    messageApi.open({
      type,
      content: message,
    });
  };


  useEffect(() => {
    if (cohorts.length && !selectedCohort.length) setSelectedCohort(cohorts[0].githubTeam.split('-').slice(1).join('-'));
  }, [cohorts]);

  
  useEffect(() => {
    if (selectedCohort.length) fetchPairs();
  }, [selectedCohort]);

  
  
  const fetchPairs = async () => {
    try {
      setLoading(true);
      const pairsUrl = conf.API_BASE_URL + '/sprint/junior/pairs/' + selectedCohort;
      const pairs: IJuniorSprintPair[] = await serverFetch('get', pairsUrl);
      setPairs(pairs);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      displayMessage('error', 'An error occured while fetching pairs.');
      console.log("error", error.message);
    }
  };
  
  const generatePairs = async () => {
    try {
      setGenerating(true);
      const generateUrl = conf.API_BASE_URL + '/sprint/junior/generate/' + selectedCohort;
      await serverFetch('post', generateUrl);
      await fetchPairs();
      displayMessage('success', 'Pairs generated for ' + selectedCohort + ' cohort.');
      setGenerating(false);
    } catch (error) {
      setGenerating(false);
      displayMessage('error', 'An error occured while generating pairs.');
      console.log(error)
    }
  }


  const downloadPairs = () => {
    displayMessage('info', 'Download PDF has not been implemented, yet.')
  }

  const elements = {
    successMessage: "Pairs have been generated for this cohort.",
    errorMessage: "Pairs need to be generated for this cohort.",
    successButton: <Button type="primary" icon={<DownloadOutlined />} onClick={downloadPairs}>Download Pairs</Button>,
    errorButton: <Button type="primary" icon={<TeamOutlined />} onClick={generatePairs} loading={generating}>Generate Pairs</Button>
  }

  return (
    <div style={{ width: "100%", display: 'flex', justifyContent: "center" }}>
      {contextHolder}
      {cohorts.length ?
        <Spin spinning={loading}>
          <Alert type={pairs.length ? "success" : "error"}
            message="Cohort Sprint Pairs"
            description={pairs.length ? elements.successMessage : elements.errorMessage}
            action={
              <>
                <Select
                  showSearch
                  placeholder="Cohort"
                  options={cohorts.map(cohort => ({ label: cohort.name.split(' ')[2] + (cohort.live ? " ⭐" : ""), value: cohort.githubTeam.split('-').slice(1).join('-') }))}
                  style={{ width: 150, marginBottom: 25, marginTop: 25, marginLeft: 20, marginRight: 10 }}
                  onChange={(value: string) => setSelectedCohort(value)}
                  value={selectedCohort}
                />
                {pairs.length ? elements.successButton : elements.errorButton}
              </>

            }
          />
        </Spin>
        : null
      }

    </div>
  )
}

export default SprintPairs