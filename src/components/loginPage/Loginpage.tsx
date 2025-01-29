import React from 'react'
import findlylogo from "../../ascites/findlylogo.png"
function Loginpage() {
  return (
    <div>
      <div>
        <div className='w-40 my-12 mx-12' >
            <img src="/ascites/findlylogo.png" alt="findly log" />
        </div>
        <div>
            <div>
                <div className='w-1/2'>
                <h1 className='font-semibold text-7xl text-center'>Sign in </h1>
                <p className='mt-3 text-center'>Explore jobs and buld skills</p>
                </div>
                <div>
                    <form action="" className='flex flex-col w-1/2'>
                        <label>Email</label>
                        <input type="email" placeholder='Email' className='p-2 rounded-full border border-black w-1/2 m-1'/>
                        <label>Password</label>
                        <input type="Password" placeholder='Password' className='p-2 rounded-full border border-black w-1/2 m-1'/>
                        <button className='bg-blue-700'>Submit</button>
                    </form>
                </div>

            </div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
