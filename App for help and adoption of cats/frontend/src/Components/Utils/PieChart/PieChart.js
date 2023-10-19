import { useEffect, useState } from "react";
import classes from "./PieChart.module.css";
import Chart from "react-apexcharts";
import axios from "axios";

const PieChart = () => {
  const [year, setYear] = useState("2023");
  const [donations, setDonation] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    window.scroll(0, 100);
    const response = axios
      .get(
        `http://127.0.0.1:8000/api/donations?donors="statistics"&year=${year}`
      )
      .then((response) => {
        setDonation(response.data.yearly_donations);
        setTotal(response.data.yearly_total)
      })
      .catch((error) => console.log(error));
  }, [year]);

  return (
    <div className={classes.pie_chart}>
      <select
        defaultValue={year}
        onChange={(event) => setYear(event.target.value)}
      >
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>

      <Chart
        type="pie"
        width={550}
        height={550}
        series={donations}
        options={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        }}
      />
      <span className={classes.pie_chart__total}>Total:{total}€</span>
    </div>
  );
};

export default PieChart;
