"use client";

import { getUserRole } from "@/api/user";
import AddedSalesChart from "@/components/AddedSalesChart/AddedSalesChart";
import ChartsComponent from "@/components/ChartsComponent/ChartsComponent";
import LastFiveOrders from "@/components/LastFiveOrders/LastFiveOrders";
import LastTransaction from "@/components/LastTransaction/LastTransaction";
import SalesProfit from "@/components/SalesProfit/SalesProfit";
import TopSaleFiveProduct from "@/components/TopSaleFiveProduct/TopSaleFiveProduct";
import { AuthContext } from "@/hooks/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withProtectedRoute from "@/Wrapper/protectedRoute";

function Dash() {
  
  // console.log("inside dash "+user);
  
  return (
    <>
     
        <div className="font-futura-sans font-thin">
          <div className="">
            {/* <AddedSalesChart /> */}
          </div>
          <div>
            <ChartsComponent />
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <TopSaleFiveProduct />
            <LastFiveOrders />
            <SalesProfit/>
          </div>
          {/* <LastTransaction /> */}
        </div>
    
    </>
  );
}

export default withProtectedRoute(Dash);
