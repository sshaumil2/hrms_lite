import AdminHeader from "../../component/AdminHeader";
import Icons from "../../myIcon/Icons";
import { Link } from "react-router-dom";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useEffect, useState } from "react";
import { use } from "react";

const dashboardListEndpoint = ApiEndpoints.Dashboard.List;

export default function Dashboard() {
    const [dashboard, setDashboard] = useState([]);

    const getLeadsCount = async () => {
        try {
            const response = await ApiRequest("GET", dashboardListEndpoint);
            setDashboard(response);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    }

    useEffect(() => {
        getLeadsCount();
    }, []);


    

    const pagename = {
        name: 'Dashboard',
        user: 'Admin',
        innerpage: 'Dashboard'
    }


    return (
        <>
            <AdminHeader pagename={pagename} />
            <div className="add-btn-section">
                <div className="row">
                    <div class="col-lg-4">
                        <div class="home-dashbox grey-card">
                            <div class="dashbox-month">
                                <span>Total Employees</span>
                            </div>
                            <h4>{dashboard?.total_employees}</h4>
                            <div class="dashbox-link">
                                <p>Eployees</p>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="home-dashbox pink-card">
                            <div class="dashbox-month">
                                <span>In The Office</span>
                            </div>
                            <h4>{dashboard?.present_today}</h4>
                            <div class="dashbox-link">
                                <p>Employees Present Today</p>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>

                

                    <div class="col-lg-4">
                        <div class="home-dashbox green-card">
                            <div class="dashbox-month">
                                <span>Not In Office</span>
                                
                            </div>
                            <h4>{dashboard?.absent_today}</h4>
                            <div class="dashbox-link">
                                <p>Employees Absent Today</p>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <div class="home-dashbox orange-card">
                            <div class="dashbox-month">
                                <span>Not Marked</span>
                            </div>
                            <h4>{dashboard?.not_marked_today}</h4>
                            <div class="dashbox-link">
                                <p>Employee Not Marked Attendance</p>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}