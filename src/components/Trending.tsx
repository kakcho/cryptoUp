import useAxios from "../hooks/useAxios"
import CoinTrending from "./CoinTrending"

interface Response {
  categories?: any,
  coins?: any[],
}


const Trending = () => {
    const response: Response | any  = useAxios('search/trending').response
    console.log(response)
  return (
    <div className="mt-8">
        <h1 className="text-2xl mb-2">Trending</h1>
        {response && response.coins.map((coin: any) => <CoinTrending coin={coin.item}/>)}
    </div>
  )
}

export default Trending