import AdminHeader from "../../component/AdminHeader";
import Icons from "../../myIcon/Icons";
import { Link } from "react-router-dom";
import ApiRequest from "../../helper/ApiRequest";
import { ApiEndpoints } from "../../helper/ApiEndpoints";
import { useEffect, useState } from "react";

const dashboardListEndpoint = ApiEndpoints.Dashboard.List;
const MonthlyEndpoint = ApiEndpoints.Dashboard.monthlycount;

export default function Dashboard() {
    const [leadsCount, setLeadsCount] = useState();
    const [tempCount, setTempCount] = useState();
    const [selectedMonth, setSelectedMonth] = useState({
        blog_count: "",
        contact_form_count: "",
        business_form_count: "",
        seo_count:"",
    });

    const getLeadsCount = async () => {
        try {
            const response = await ApiRequest("GET", dashboardListEndpoint);
            setLeadsCount(response);
            setTempCount(response);
        } catch (error) {
            console.error("Error fetching leads count:", error);
        }
    }

    useEffect(() => {
        getLeadsCount();
    }, []);


    // monthly 
    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (value !== "") {
            setSelectedMonth((prev) => ({
                ...prev,
                [name]: value,
            }));
            try {
                const response = await ApiRequest("GET", `${MonthlyEndpoint}/${value}`);
                setLeadsCount((prev) => ({
                    ...prev,
                    [name]: response[name],
                }));
            } catch (error) {
                console.error("Error fetching leads count:", error);
            }
        } else {
            setLeadsCount((prev) => ({
                ...prev,
                [name]: tempCount[name],
            }));
            setSelectedMonth((pre) => ({
            ...pre,
            [name]: "",
        }))
        }
    };

    const handleRefresh = async (name) => {
        setLeadsCount((prev) => ({
            ...prev,
            [name]: tempCount[name],
        }));

        setSelectedMonth((pre) => ({
            ...pre,
            [name]: "",
        }))
    };

    const year = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const options = [
        { value: year + "-01", title: "January" },
        { value: year + "-02", title: "February" },
        { value: year + "-03", title: "March" },
        { value: year + "-04", title: "April" },
        { value: year + "-05", title: "May" },
        { value: year + "-06", title: "June" },
        { value: year + "-07", title: "July" },
        { value: year + "-08", title: "August" },
        { value: year + "-09", title: "September" },
        { value: year + "-10", title: "October" },
        { value: year + "-11", title: "November" },
        { value: year + "-12", title: "December" }
    ];

    const dropData = options.filter((item) => {
        const month = item.value.split("-").map(Number)[1];
        return month <= currentMonth;
    });

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
                                <span>Total Blogs</span>
                                <div>
                                    <select
                                        value={selectedMonth.blog_count}
                                        onChange={handleChange}
                                        name="blog_count" >
                                        <option value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("blog_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.blog_count}</h4>
                            <div class="dashbox-link">
                                <p>Blogs</p>
                                <Link to="/blog">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>

                    {/* <div class="col-lg-4">
                        <div class="home-dashbox pink-card">
                            <div class="dashbox-month">
                                <span>Total AI Blogs</span>
                                <div>
                                    <select
                                        value={selectedMonth.aiblog_count}
                                        onChange={handleChange}
                                        name="aiblog_count" >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("aiblog_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.aiblog_count}</h4>
                            <div class="dashbox-link">
                                <p>AI Blogs</p>
                                <Link to="blog">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div> */}

                    {/* <div class="col-lg-4">
                        <div class="home-dashbox orange-card">
                            <div class="dashbox-month">
                                <span>Total Press Release</span>
                                <div>
                                    <select
                                        value={selectedMonth.press_release_count}
                                        onChange={handleChange}
                                        name="press_release_count"   >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("press_release_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.press_release_count}</h4>
                            <div class="dashbox-link">
                                <p>Press Release </p>
                                <Link to="apply-now">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div> */}

                    <div class="col-lg-4">
                        <div class="home-dashbox pink-card">
                            <div class="dashbox-month">
                                <span>Total Contact Leads</span>
                                <div>
                                    <select
                                        value={selectedMonth.contact_form_count}
                                        onChange={handleChange}
                                        name="contact_form_count"   >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("contact_form_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.contact_form_count}</h4>
                            <div class="dashbox-link">
                                <p>Contact Us</p>
                                <Link to="/contact">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>

                    {/* <div class="col-lg-4">
                        <div class="home-dashbox purple-card">
                            <div class="dashbox-month">
                                <span>Total Applications</span>
                                <div>
                                    <select
                                        value={selectedMonth.job_application_count}
                                        onChange={handleChange}
                                        name="job_application_count"   >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("job_application_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.job_application_count}</h4>
                            <div class="dashbox-link">
                                <p>Job Applications</p>
                                <Link to="schedule-visit">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div> */}

                    <div class="col-lg-4">
                        <div class="home-dashbox green-card">
                            <div class="dashbox-month">
                                <span>Total Business Leads</span>
                                <div>
                                    <select
                                        value={selectedMonth.business_form_count}
                                        onChange={handleChange}
                                        name="business_form_count"   >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("business_form_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.business_form_count}</h4>
                            <div class="dashbox-link">
                                <p>Service Form </p>
                                <Link to="/business-contact">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>



                    {/* <div class="col-lg-4">
                        <div class="home-dashbox orange-card">
                            <div class="dashbox-month">
                                <span>Total Newsletters </span>
                                <div>
                                    <select
                                        value={selectedMonth.newsletter_count}
                                        onChange={handleChange}
                                        name="newsletter_count"    >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("newsletter_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.newsletter_count}</h4>
                            <div class="dashbox-link">
                                <p>Newsletters </p>
                                <Link to="apply-now">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div> */}

                    <div class="col-lg-4">
                        <div class="home-dashbox orange-card">
                            <div class="dashbox-month">
                                <span>Total Seo</span>
                                <div>
                                    <select value={selectedMonth.seo_count} onChange={handleChange} name="seo_count"  >
                                        <option  value="">All Months</option>
                                        {dropData.map((drop, index) => (
                                            <option key={index} value={drop.value}>{drop.title}</option>
                                        ))}
                                    </select>
                                    <a onClick={() => handleRefresh("seo_count")}><Icons name="rotateRight" /></a>
                                </div>
                            </div>
                            <h4>{leadsCount?.seo_count}</h4>
                            <div class="dashbox-link">
                                <p>Seo </p>
                                <Link to="/seo">See Full List</Link>
                            </div>
                            <img src="/assets/wave.webp" class="dash-wave" alt="wave" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}