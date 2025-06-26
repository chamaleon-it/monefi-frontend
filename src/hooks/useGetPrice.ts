import getConfig from "@/config/configuration";
import axios from "axios";
import  { useCallback, useEffect, useState } from "react";


const cryptoApi = axios.create({
    baseURL:'https://api.coingecko.com/api/v3/simple'
})

const stockApi = axios.create({
    baseURL:'https://api.twelvedata.com'
})

export default function useGetPrice({
  type,
  symbol,
}: {
  type: "stock" | "crypto";
  symbol: string;
}) {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPrice = useCallback(async () => {
    setLoading(true)
    try {
      if (type === "stock") {
        const {data} =await stockApi.get(`/price?symbol=${symbol.toUpperCase()}&apikey=${getConfig().twelveDataApiKey}`)
        setPrice(parseFloat(data.price))
      }
      if (type === "crypto") {
        const {data} = await cryptoApi.get(`/price?ids=${symbol}&vs_currencies=usd`)
        setPrice(data[symbol].usd)
      }
    } catch (error) {
      setError("Something went wrong while fetching the price.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [type, symbol]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return { price, loading, error };
}
