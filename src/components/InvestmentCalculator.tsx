"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, ArrowRight, PiggyBank, Briefcase, LineChart } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';

type CalculatorType = 'SIP' | 'BOND' | 'STOCK';

export function InvestmentCalculator() {
  const [calcType, setCalcType] = useState<CalculatorType>('SIP');

  // Inputs
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(10);

  // Static average rates based on type
  const rates = {
    SIP: 12, // 12% equity mutual funds
    BOND: 6, // 6% corporate bonds
    STOCK: 15, // 15% direct equities
  };

  const [totalInvested, setTotalInvested] = useState<number>(0);
  const [futureValue, setFutureValue] = useState<number>(0);

  useEffect(() => {
    const rate = rates[calcType] / 100;
    const months = years * 12;
    const monthlyRate = rate / 12;

    let invested = initialAmount;
    let fv = initialAmount * Math.pow(1 + rate, years);

    invested += monthlyContribution * months;
    fv += monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

    setTotalInvested(Math.round(invested));
    setFutureValue(Math.round(fv));
  }, [initialAmount, monthlyContribution, years, calcType]);

  const estimatedReturns = futureValue - totalInvested;

  // Chart calculation (percentage widths)
  const investedPercent = (totalInvested / futureValue) * 100 || 0;
  const returnsPercent = 100 - investedPercent;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return null

  return (
    <section className="py-10 lg:py-12 bg-[#FAFAFA] relative overflow-hidden">
      <ScrollAnimation className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-6 transform -rotate-12 hover:rotate-0 transition-transform cursor-pointer">
            <span className="text-3xl">🌱</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-[#082348] mb-4">Watch your wealth grow.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-[16px] leading-relaxed">
            Play with the sliders below to see how a little consistency today can blossom into something beautiful tomorrow.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[3rem] p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          {/* Cute Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => setCalcType('SIP')}
              className={`flex-1 py-4 px-6 rounded-[2rem] font-bold text-[15px] transition-all flex items-center justify-center gap-3 ${calcType === 'SIP' ? 'bg-[#082348] text-white shadow-lg transform -translate-y-1' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <PiggyBank className="w-5 h-5" /> SIP & Funds
            </button>
            <button
              onClick={() => setCalcType('BOND')}
              className={`flex-1 py-4 px-6 rounded-[2rem] font-bold text-[15px] transition-all flex items-center justify-center gap-3 ${calcType === 'BOND' ? 'bg-corporate-gold text-white shadow-lg transform -translate-y-1' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <Briefcase className="w-5 h-5" /> Safe Bonds
            </button>
            <button
              onClick={() => setCalcType('STOCK')}
              className={`flex-1 py-4 px-6 rounded-[2rem] font-bold text-[15px] transition-all flex items-center justify-center gap-3 ${calcType === 'STOCK' ? 'bg-indigo-500 text-white shadow-lg transform -translate-y-1' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
            >
              <LineChart className="w-5 h-5" /> Direct Equities
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side: Soft Sliders */}
            <div className="space-y-10">
              {/* Slider 1 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[15px] font-bold text-slate-700">Initial Seed</label>
                  <span className="text-2xl font-bold text-[#082348] bg-slate-50 px-4 py-1 rounded-full group-hover:scale-105 transition-transform">{formatCurrency(initialAmount)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#082348]"
                />
              </div>

              {/* Slider 2 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[15px] font-bold text-slate-700">Monthly Habit</label>
                  <span className="text-2xl font-bold text-[#082348] bg-slate-50 px-4 py-1 rounded-full group-hover:scale-105 transition-transform">{formatCurrency(monthlyContribution)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#082348]"
                />
              </div>

              {/* Slider 3 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[15px] font-bold text-slate-700">Time to Grow</label>
                  <span className="text-2xl font-bold text-[#082348] bg-slate-50 px-4 py-1 rounded-full group-hover:scale-105 transition-transform">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#082348]"
                />
              </div>
            </div>

            {/* Right side: Cute Floating Result Card */}
            <div className="relative">
              <div className="relative bg-white border border-gray-100 p-10 rounded-[3rem] shadow-xl text-center flex flex-col items-center">
                <span className="inline-block px-4 py-1 bg-green-50 text-green-600 font-bold tracking-wider uppercase text-[11px] rounded-full mb-6">Your Future Value</span>

                <div className="text-5xl lg:text-[4rem] font-bold tracking-tighter text-[#082348] mb-10 leading-none">
                  {formatCurrency(futureValue)}
                </div>

                {/* Soft Visual Bar */}
                <div className="w-full max-w-sm h-6 flex rounded-full overflow-hidden mb-8 bg-slate-50 shadow-inner p-1 gap-1">
                  <div
                    className="h-full bg-slate-200 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${investedPercent}%` }}
                  ></div>
                  <div
                    className="h-full bg-gradient-to-r from-corporate-gold to-yellow-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${returnsPercent}%` }}
                  ></div>
                </div>

                <div className="flex w-full justify-between max-w-sm px-2">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                      <span className="text-[13px] text-slate-500 font-medium">You put in</span>
                    </div>
                    <span className="font-bold text-slate-700">{formatCurrency(totalInvested)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-corporate-gold"></div>
                      <span className="text-[13px] text-slate-500 font-medium">You earned</span>
                    </div>
                    <span className="font-bold text-corporate-gold">+{formatCurrency(estimatedReturns)}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
