/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";

// Table Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import { Card } from "@mui/material";
import Projects from "./components/Projects";
import { object } from "prop-types";
import { useEffect, useState } from "react";
import { BASE_URL } from "config";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const { columns, rows } = authorsTableData();
  const [userData, setUserData] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Users", data: [0, 0, 0, 0, 0, 0, 0] },
  });
  const [mealsData, setMealsData] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Meals", data: [0, 0, 0, 0, 0, 0, 0] },
  });
  const [waterData, setWaterData] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: { label: "Water/cups", data: [0, 0, 0, 0, 0, 0, 0] },
  });

  const getUserData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${BASE_URL}/getUserStats`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        var res = result.data;
        var data = [];
        Object.keys(res).forEach((key) => {
          data.push(res[key]);
        });
        setUserData({
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: { label: "Users", data: data },
        });
      })
      .catch((error) => console.log("error getting user stats: ", error));
  };

  const getMealsData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${BASE_URL}/getMealStats`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        var res = result.data;
        var data = [];
        Object.keys(res).forEach((key) => {
          data.push(res[key]);
        });
        setMealsData({
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: { label: "Meals", data: data },
        });
      })
      .catch((error) => console.log("error getting meal stats: ", error));
  };

  const getWaterData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${BASE_URL}/getWaterStats`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        var res = result.data;
        var data = [];
        Object.keys(res).forEach((key) => {
          data.push(res[key]);
        });
        setWaterData({
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          datasets: { label: "Water", data: data },
        });
      })
      .catch((error) => console.log("error getting water stats: ", error));
  };

  useEffect(() => {
    getUserData();
    getMealsData();
    getWaterData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Application Users"
                  description="Registered FAFH users"
                  date="Data is updated every time a new user registers"
                  chart={userData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Meals recorded"
                  description="Total meals recorded in the last 7 days"
                  date="Updated on new meal user record"
                  chart={mealsData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Water consumption"
                  description="Average water consumption in the last 7 days"
                  date="Updated on each user consumption"
                  chart={waterData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={5}>
          <Grid item xs={12} md={12} lg={12}>
            <Projects />
            {/* <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Users Table
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}  
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>*/}
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid> */}
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
