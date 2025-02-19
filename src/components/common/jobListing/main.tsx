"use client"
import React, { useState } from 'react'
import JobFiltersSidebar from './JobFiltersSidebar'
import AllJobs from './AllJobs'
import { RxCross2 } from 'react-icons/rx'
import { IoFilterSharp } from 'react-icons/io5'

function Jobelist() {
    const [page, setPage] = useState(1)
    const [togle, setTogle] = useState(false)
    return (
        <div className='w-full h-full fixed'>
            <div className='flex'>
                <div className={`min-w-32 max-w-52 w-full border-r-2 border-gray-300 h-full transition-transform duration-300 ease-in-out 
  ${togle ? "translate-x-0 absolute top-16 left-0" : "-translate-x-full hidden h-full"} sm:translate-x-0 sm:relative sm:block h-full`}>
                    <button
                        onClick={() => setTogle(!togle)}
                        className={`block sm:hidden absolute top-5 right-2 p-2 `}>
                        <RxCross2 />
                    </button>
                    <JobFiltersSidebar />
                </div>

                <div className=' w-full '>
                    <div className=''>
                        <div className='flex items-center p-1 border-b-2 border-gray-300'>
                            <button
                                className="p-2 cursor-pointer block sm:hidden"
                                onClick={() => setTogle(!togle)}
                            >
                                <IoFilterSharp />

                            </button>
                            <button
                                onClick={() => setPage(1)}
                                className={`p-2 text-base sm:text-lg hover:font-bold min-w-[6rem] sm:min-w-[8rem] text-center ${page == 1 ? "font-bold underline" : ""}`}
                            >
                                All Jobs
                            </button>

                            <button
                                onClick={() => setPage(2)}
                                className={`p-2 text-base sm:text-lg hover:font-bold min-w-[7rem] sm:min-w-[9rem] text-center ${page == 2 ? "font-bold underline" : ""}`}
                            >
                                Saved Jobs
                            </button>

                            <button
                                onClick={() => setPage(3)}
                                className={`p-2 text-base sm:text-lg hover:font-bold min-w-[7rem] sm:min-w-[9rem] text-center ${page == 3 ? "font-bold underline" : ""}`}
                            >
                                Applied Jobs
                            </button>
                        </div>
                    </div>
                    <div>
                    {page == 1 && <AllJobs />}
                    {page == 2 && <div> page 2 </div>}
                    {page == 3 &&
                        <div>
                            page-3
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobelist