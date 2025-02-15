import Dashboard from "../../components/Dashboard/Dashboard";
import NavBar from "../../components/NavBar/NavBar";

const DashboardPage = () => {
    
    return (

        <div className="main-container">
            <NavBar displaySearchBar={true} />
            <Dashboard />
        </div>
    )
}

export default DashboardPage;