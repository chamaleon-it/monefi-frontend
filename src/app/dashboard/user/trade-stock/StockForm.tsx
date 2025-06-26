import { topStock } from '@/data/top-stock'
import useGetPrice from '@/hooks/useGetPrice';
import api from '@/services/api';
import { fCurrency } from '@/utility/numberFormatters'
import React, { useMemo, useState } from 'react'
import toast from 'react-hot-toast';

export default function StockForm({ symbol }: { symbol: string }) {
  const [quantity, setQuantity] = useState<number | null>(null);

    const stock = useMemo(() => topStock.find(st => st.symbol === symbol), [symbol])

    const { price, loading: prceLoading } = useGetPrice({
        type: "stock",
        symbol: stock?.symbol || "",
      });

  const purchasePrice = useMemo(
      () => (price ?? 0) * (quantity ?? 0),
      [price, quantity]
    );


     const buy = async() =>{
    if(!price){
      toast.error("Somthing error on fetching unit price")
      return
    }
    if(!quantity) {
      toast.error("Please enter quantity")
      return
    }
    if(purchasePrice < 5000){
      toast.error("Minimum purchase amount must be greater than "+fCurrency(5000))
      return
    }
    if(!stock?.symbol) {
      toast.error("Please select any stock")
      return
    }
    const data = {
      symbol:stock?.symbol,
      name:stock?.name,
      unitPrice:price,
      quantity
    }

     try {
      await toast.promise(api.post('/transactions/stock',data),{
        loading:"Please wait ,Purchasing on progress...",
        error:"Please Check your balance",
        success:"Your request for purchase under verification."
      })
    } catch (error) {
      console.log(error);
    }
}

  return (
    <div className="w-full max-w-md mx-auto bg-monefi-off-pink shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200 pointer-events-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Stock Name</p>
          <p className="text-lg font-semibold text-gray-800">{stock?.name ?? 'Unknown'}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Symbol</p>
          <p className="text-lg font-semibold text-gray-800">{stock?.symbol ?? 'N/A'}</p>
        </div>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          placeholder="Enter quantity"
          className="w-full h-10 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setQuantity(+e.target.value)}
          value={quantity || ""}
        />
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-500">Trade Minimum</p>
        <p className="text-xl font-semibold text-gray-800">{fCurrency(5000)}</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <p className="text-sm text-gray-500">Current Price</p>
              <p className="text-xl font-semibold text-gray-800">
                {prceLoading ? "Price is fetching.." : fCurrency(price || 0)}
              </p>
            </div>
      
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-center">
              <p className="text-sm text-gray-500">Purchase Price</p>
              <p className="text-xl font-semibold text-gray-800">
                {fCurrency(purchasePrice)}
              </p>
            </div>

      <div className="pt-2">
        <button
          type="button"
          className="w-full h-11 bg-monefi-pink hover:bg-monefi-pink/80 text-white font-medium text-sm rounded-md transition duration-200"
          onClick={buy}
        >
          Buy Stock
        </button>
      </div>
    </div>
  )
}
