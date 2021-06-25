
import { Link } from "react-router-dom";

const InnerPage = (props) => {
  return(
    <div>
      <Link to="/">Home</Link>
      <Link to="/pageTwo">pageTwo</Link>
      yo
    </div>
  )
}
export default InnerPage;