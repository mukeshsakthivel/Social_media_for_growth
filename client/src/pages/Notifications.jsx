import { Link } from "react-router-dom"

const Notifications = () => {
  return (
    <div className="flex mt-6 lg:flex-row flex-col mr-20 lg:mr-0">
      {/* first column */}
      <div className="ml-5 md:ml-10 lg:ml-20 w-full lg:w-1/5">
        <div className="border border-solid bg-white rounded-lg h-72"></div>
        <div className="border border-solid bg-white rounded-lg mt-3 p-4">
          <p className="font-semibold mb-5">Manage Your Notifications</p>
          <Link className="text-blue-600 font-semibold hover:underline">View Settings</Link>
        </div>
      </div>
      {/* second column */}
      <div className="ml-10 w-full lg:w-3/4 mr-20 mt-10 lg:mt-0">
        <div className="border border-solid bg-white rounded-lg p-5">
          <Link className="border border-solid p-2 pl-3 pr-3 rounded-lg font-semibold">All</Link>
          <Link className="border border-solid p-2 ml-5 pl-3 pr-3 rounded-lg font-semibold">My Posts</Link>
        </div>
        <div className="mt-3 border border-solid bg-white rounded-lg h-72"></div>
      </div>
    </div>
  )
}

export default Notifications