import AppListItem from "./AppListItem"

const Dashboard = () => {
    return (
        <div className=" justify-center w-full grid mb-4">
          <div className="mt-8 mb-12 text-blue-950 font-bold text-4xl w-full text-center">
            Welcome to Portal-Me!
          </div>
          <div className="flex justify-center gap-6">
            <AppListItem/>
          </div>
        </div>
      )
}

export default Dashboard
