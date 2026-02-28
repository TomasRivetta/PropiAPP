"use client";

import { useState, useEffect } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  // Derived State (calculated on every render)
  const billAmount = parseFloat(bill) || 0;
  const currentTipPercent = isCustom ? (parseFloat(customTip) || 0) : tipPercentage;
  
  const totalTip = (billAmount * currentTipPercent) / 100;
  const totalBill = billAmount + totalTip;
  
  const tipPerPerson = peopleCount > 0 ? totalTip / peopleCount : 0;
  const totalPerPerson = peopleCount > 0 ? totalBill / peopleCount : 0;

  const presets = [10, 15, 18, 20, 25];

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setBill(value);
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomTip(value);
      setIsCustom(true);
    }
  };

  const selectPreset = (preset: number) => {
    setTipPercentage(preset);
    setIsCustom(false);
    setCustomTip("");
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md flex flex-col gap-6 z-10">
        {/* Header / Total per Person */}
        <div className="glass-card flex flex-col items-center justify-center p-8 bg-black/20 backdrop-blur-2xl border-t border-l border-white/10 shadow-[0_8px_32px_rgba(176,38,255,0.15)]">
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-2">Total por persona</p>
          <div className="text-5xl md:text-6xl font-bold text-white glow-text tracking-tight flex items-start">
            <span className="text-2xl mt-2 mr-1 text-neon-purple">$</span>
            {totalPerPerson.toFixed(2)}
          </div>
        </div>

        <div className="glass-card flex flex-col gap-8">
          {/* Bill Input */}
          <div>
            <label className="text-gray-300 text-sm font-semibold mb-3 block">Total de la cuenta</label>
            <div className="relative flex items-center">
              <span className="absolute left-0 text-gray-400 text-2xl mb-1">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={bill}
                onChange={handleBillChange}
                placeholder="0.00"
                className="glass-input pl-8 py-2 text-4xl"
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div>
            <label className="text-gray-300 text-sm font-semibold mb-3 block">Selecciona el % de propina</label>
            <div className="grid grid-cols-3 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => selectPreset(preset)}
                  className={!isCustom && tipPercentage === preset ? "glass-button-active" : "glass-button"}
                >
                  {preset}%
                </button>
              ))}
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  onClick={() => setIsCustom(true)}
                  placeholder="Custom"
                  className={`w-full h-full min-h-[48px] text-center rounded-xl bg-white/5 border text-white transition-all duration-200 outline-none
                    ${isCustom 
                      ? "border-neon-purple shadow-[0_0_10px_var(--color-neon-purple-glow)]" 
                      : "border-white/10 hover:border-white/30"
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Split Bill */}
          <div>
            <label className="text-gray-300 text-sm font-semibold mb-3 block">Dividir</label>
            <div className="flex items-center justify-between glass p-2 rounded-2xl">
              <button 
                onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 text-2xl flex items-center justify-center transition-colors"
              >
                -
              </button>
              <div className="text-2xl font-bold w-12 text-center">{peopleCount}</div>
              <button 
                onClick={() => setPeopleCount(peopleCount + 1)}
                className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 text-2xl flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass rounded-3xl p-6 bg-black/40 border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 font-medium">Total de la cuenta</span>
            <span className="text-xl font-semibold">${totalBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 font-medium">Total de la propina</span>
            <span className="text-xl font-semibold text-neon-purple">${totalTip.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <span className="text-gray-400 font-medium pb-1">Propina por persona</span>
            <span className="text-xl font-bold">${tipPerPerson.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
