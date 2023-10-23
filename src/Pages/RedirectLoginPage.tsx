import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { checkIfStaff, getAccessToken } from '../Services/githubAuth.service';
import { Spin } from 'antd';

function RedirectLoginPage() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function getAccess (code: string) {
    try {
      const token = await getAccessToken(code);
      const isStaff = await checkIfStaff(token);

      if (isStaff) {
        localStorage.setItem('github-access-token', token);
        navigate('/leads');
      } else navigate('/login');
    } catch (error) {
      console.log(error);
      navigate('/login');
    }

  }

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) navigate('/login');
    else getAccess(code);
  }, []);

  return (
    <Spin spinning={true} tip="Redirecting..." size="large">
      <div className='login-container'></div>
    </Spin>
  )
}

export default RedirectLoginPage