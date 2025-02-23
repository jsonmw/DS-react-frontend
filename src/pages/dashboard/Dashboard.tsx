import { useEffect, useState } from "react"
import GetStartedModal from "../../components/GetStartedModal"

const Dashboard = () => {

  // New User Get Started Modal logic
  const [firstLogin, setFirstLogin] = useState(false);
  useEffect(() => {
      if (localStorage.getItem && localStorage.getItem("firstLogin") === "true") {
        setFirstLogin(true);;
        localStorage.removeItem("firstLogin");
      }
  }, []);


  return (
    <div>
        <h1>You were successfully authenticated.</h1>
        {firstLogin && <GetStartedModal onClose={() => setFirstLogin(false)} />}
    </div>
  )
}

export default Dashboard