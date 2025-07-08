"use client"

import { topCrypto } from '@/data/top-crypto'
import React, { useState } from 'react'
import {AdvancedRealTimeChart, CryptoCoinsHeatmap, MarketOverview, StockMarket, SymbolInfo, Ticker, TickerTape} from 'react-ts-tradingview-widgets'
import CryptoForm from './CryptoForm'

export default function TradeCryptoPage() {
const [symbol, setSymbol] = useState(topCrypto[0].symbol)

  return (
    <div className='flex flex-col gap-2.5 pointer-events-none'>
        <TickerTape colorTheme="light" />
        <Ticker colorTheme="light" />
        <select name="" id="" className='w-[400px] h-14 px-5 rounded-xl border-2 border-monefi-off-pink bg-monefi-off-pink  pointer-events-auto font-semibold' onChange={e=>setSymbol(e.target.value)} value={symbol}>
            {topCrypto.map(e=>(<option key={e.symbol} className='text-black' value={e.symbol}>{e.name}</option>))}
          </select>
        <SymbolInfo colorTheme="light" autosize symbol={symbol}/>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5">
            <div className="col-span-3 w-full relative">
            <AdvancedRealTimeChart allow_symbol_change={false} theme="light" symbol={symbol} width={"100%"} height={500}/>
            </div>
            <CryptoForm symbol={symbol}/>
        </div>
        <CryptoCoinsHeatmap  colorTheme='light' height={600}/>
        <MarketOverview colorTheme="light" height={400} width="100%" showFloatingTooltip />
        <StockMarket colorTheme="light" height={400} width="100%"  />
    </div>
  )
}
