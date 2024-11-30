import { useNavigate } from "react-router-dom"

function UnauthorizedPage() {
  const navigate = useNavigate()

  function goBack() {
    return navigate(-1)
  }

  return (
    <div>
      <h1>Unauthorized</h1>
      <p>
        You are not authorized to access this page. Please contact your
        administrator.
      </p>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default UnauthorizedPage