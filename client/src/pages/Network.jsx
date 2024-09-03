const Network = () => {
  return (
    <div className="flex mt-6 md:flex-row flex-col ml-5 mr-20 md:ml-0">
      <div className="ml-5 lg:ml-20 md:ml-10 w-full md:w-1/4">
        <p className="border border-solid bg-white rounded-lg p-2 sm:p-4 md:p-6 font-semibold">
          My Network
        </p>
        <div className="mt-3 border border-solid h-80 sm:h-96 bg-white rounded-lg"></div>
      </div>
      <div className="ml-5 md:ml-8 w-full md:w-4/6 mr-5 md:mr-28">
        <p className="border border-solid bg-white rounded-lg w-full p-2 sm:p-4 font-semibold">
          Make more Connections
        </p>
        <p className="mt-3 border border-solid w-full p-2 sm:p-4 bg-white rounded-lg">
          No Pending Requests
        </p>
        <div className="mt-3 border border-solid w-full bg-white rounded-lg h-60 sm:h-80">
          <p className="p-2 sm:p-3">based on your interest</p>
        </div>
      </div>
    </div>
  )
}

export default Network