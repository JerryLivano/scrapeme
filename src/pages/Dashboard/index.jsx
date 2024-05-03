import AppListItem from "./AppListItem"

const Dashboard = () => {
    return (
        <div className=" justify-center w-full grid">
          <div className="py-20 text-blue-800 font-bold text-4xl w-full text-center">
            Welcome to Portal-Me!
          </div>
          <div className="justify-center gap-6">
            <AppListItem/>
          </div>
        </div>
      )
}

export default Dashboard
