import { userContext } from "../context/userContext";
import { useContext } from "react";

const Home = () => {

  const {userDeatil}=useContext(userContext);
  console.log(userDeatil);

  return (
    <div className="flex mt-6 borderCol:flex-row flex-col items-center">
      <div className="border border-solid bg-white rounded-2xl mx-6 lg:ml-20 lg:mr-6 borderCol:w-2/6 thirdBorder:w-1/5 h-52 borderCol:h-screen w-3/4"></div>
      <div className="border border-solid bg-white rounded-2xl w-3/4 thirdBorder:w-2/5 h-screen thirdBorder:mr-0 mr-10 ml-10 mt-5 borderCol:ml-0 borderCol:mt-0"></div>
      <div className="border border-solid bg-white rounded-2xl mx-6 lg:ml-6 lg:mr-28 hidden thirdBorder:block thirdBorder:w-3/12 h-screen"></div>
    </div>
  )
}

export default Home;