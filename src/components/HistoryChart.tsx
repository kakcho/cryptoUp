import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";
import Skeleton from "./Skeleton";

interface Response {
    categories?: any,
    coins?: any[],
    price?: number,
  }
  

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const HistoryChart = () => {
  const { id } = useParams();
  const  response: Response | any  = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=7`).response
  
  if(!response) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-72 w-full mb-10" />
      </div>
    )
  }
  const coinChartData = response.prices.map((value: any) => ({ x: value[0], y: value[1].toFixed(4) }));
  
  const options = {
    responsive: true
  }

  const data = {
    labels: coinChartData.map((value: any) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val: any) => val.y),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  )
}

export default HistoryChart