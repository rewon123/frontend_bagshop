"use client";
import "../globals.css";
import DashboardSidebar from "@/components/DashboardSideBar/DashboardSidebar";
import { useContext, useEffect, useState } from "react";
import withProtectedRoute from "@/Wrapper/protectedRoute";
import Link from "next/link";
function RootLayout({ children }) {
  // const { user } = useContext(AuthContext);
  // console.log(user);

  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);



  return (
    <>
     
        <div className="">
          <div className="bg-gray-100 fixed w-full z-30 flex border p-2 items-center justify-center h-16 px-10">
            <div className="logo ml-12 dark:text-black  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
              <Link href="/"> Sweet Stitch zone</Link>
            </div>
            <div className="grow h-full flex items-center justify-center"></div>
            <div className="flex-none h-full text-center flex items-center justify-center">
              <div className="flex space-x-3 items-center px-3">
                <div className="flex-none flex justify-center">
                  <div className="w-8 h-8 flex ">
                    <img
                      src="https://img.icons8.com/?size=100&id=7819&format=png&color=000000"
                      alt="profile"
                      className="shadow rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
                  {user?.firstName}
                </div> */}
              </div>
            </div>
          </div>
          <div className="mb-10">
            <DashboardSidebar />
            <div className="pt-20 pl-16 px-10 min-h-screen text-black">
              {children}
            </div>
          </div>
        </div>
    </>
  );
}

export default withProtectedRoute(RootLayout);
