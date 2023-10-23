import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import conf from '../config'
import { useEffect } from 'react'
import { checkIfStaff } from '../Services/githubAuth.service'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const navigate = useNavigate();

  useEffect(() => {
    async function checkStaff () {
      const token = localStorage.getItem('github-access-token');
      if (token) {
        const isStaff = await checkIfStaff(token);
        if (isStaff) navigate('/leads')
      }
    }

    checkStaff();
  }, [])
  

  return (
    <div className='login-container'>
      <a href={'https://github.com/login/oauth/authorize?client_id=' + conf.GITHUB_CLIENT_ID}>
        <Button type='primary' shape="round" size='large'><GithubOutlined />Login with GitHub</Button>
      </a>
    </div>
  )
}

export default LoginPage