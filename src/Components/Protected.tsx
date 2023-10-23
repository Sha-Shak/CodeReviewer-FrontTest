import { ReactNode, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { checkIfStaff } from '../Services/githubAuth.service';

function Protected({ children } : { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    async function checkStaffAuth (token: string) {
      const isStaff = await checkIfStaff(token)
      setIsAuthenticated(isStaff);
    }

    const token = localStorage.getItem("github-access-token");
    if (!token) setIsAuthenticated(false);
    else checkStaffAuth(token);

  }, [])
  
  return (
    <>{isAuthenticated ? children : <Navigate to="/login" />}</>
  )
}

export default Protected