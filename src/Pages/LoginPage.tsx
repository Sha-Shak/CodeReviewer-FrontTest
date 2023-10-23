import { GithubOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import conf from '../config'

function LoginPage() {
  return (
    <div className='login-container'>
      <a href={'https://github.com/login/oauth/authorize?client_id=' + conf.GITHUB_CLIENT_ID}>
        <Button type='primary' size='large'><GithubOutlined />Login with GitHub</Button>
      </a>
    </div>
  )
}

export default LoginPage