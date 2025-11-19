import { Link } from "react-router-dom";

const NotFoundPage = () =>{
    return <>
    <h1 className="mt-5"> 404 Error - Website not Found</h1>
    <Link to={"/"}>
    
    <button style={{backgroundColor:"blue"}}> Please click to return to Home Page</button>
    </Link>
    
    </>
}
export default NotFoundPage;