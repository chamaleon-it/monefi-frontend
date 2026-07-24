"use client"

import { topCrypto } from '@/data/top-crypto'
import React, { useState } from 'react'
import {AdvancedRealTimeChart, CryptoCoinsHeatmap, MarketOverview, StockMarket, SymbolInfo, Ticker, TickerTape} from 'react-ts-tradingview-widgets'
import CryptoForm from './CryptoForm'

export default function TradeCryptoPage() {
  const [symbol, setSymbol] = useState(topCrypto[0].symbol);

  return (
    <div className="flex flex-col gap-6 pointer-events-none font-inter">
      <div className="pointer-events-auto">
        <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#082348]">
          Digital Asset & Crypto Desk
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-0.5 mb-4">
          Tier-1 digital asset trading, real-time crypto heatmap, and spot acquisition
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/90 shadow-[0_10px_25px_rgba(8,35,72,0.04)]">
          <label htmlFor="crypto-select" className="text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
            Select Crypto Asset:
          </label>
          <select
            id="crypto-select"
            className="w-full sm:w-[360px] h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[#082348] font-bold text-sm focus:outline-none focus:border-[#C5A880] focus:ring-2 focus:ring-[#C5A880]/20 transition-all cursor-pointer"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
          >
            {topCrypto.map((e) => (
              <option key={e.symbol} className="text-slate-900 font-medium" value={e.symbol}>
                {e.name} ({e.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>
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
