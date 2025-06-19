import React from "react";

export default function LatestNews() {
  return (
    <section>
      <div className="max-w-[83%] mx-auto py-[50px] border-b border-monefi-off-white">
        <h2 className="font-poppins font-semibold text-6xl mt-6 mb-8 whitespace-nowrap text-center">
          Latest News<span className="text-monefi-pink">:</span>
        </h2>
        <div className="flex justify-center items-center gap-7 mt-20">
          <div className="w-[300px] h-[420px] rounded-4xl mb-14 bg-[url(/home/news/1.jpg)] bg-cover"></div>
          <div className="w-[300px] h-[420px] rounded-4xl mt-14 bg-monefi-green"></div>
          <div className="w-[300px] h-[420px] rounded-4xl mb-14 bg-[url(/home/news/2.jpg)] bg-cover"></div>
          <div className="w-[300px] h-[420px] rounded-4xl mt-14 bg-[url(/home/news/3.jpg)] bg-cover"></div>
        </div>
      </div>
    </section>
  );
}
