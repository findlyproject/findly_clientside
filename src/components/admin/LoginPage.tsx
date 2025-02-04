import React from 'react'
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
     
      <div
        style={{
          backgroundImage:
            "url('https://www.artavenue.com/cdn/shop/files/d4050a_8603d6c1dce748eda96429c1043c93f0_mv2_66ea8f12-0290-4c2d-954e-6da2297ff980.jpg?v=1723625285&width=1200')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>

      {/* Wrapper */}
      <div className="flex flex-wrap lg:flex-nowrap w-full max-w-5xl rounded-lg overflow-hidden z-50">
        {/* Left Section */}
        <div className="w-full  lg:w-1/2 flex flex-col items-center justify-center p-6 bg-transparent">
          <img
        src='/assets/findlylogo.png'
            alt="Logo"
            className="w-1/2 h-1/2 cursor-pointer"
          />
          {/* <h1 className="text-7xl text-blue-900 font-bold">Findly</h1> */}
        </div>

        
        <div className="hidden lg:block w-px bg-gray-700"></div>

        
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl text-white font-semibold mb-2">Welcome</h2>
          <p className="text-sm  mb-6">
            Please login to Admin Dashboard.
          </p>

          
          <form className="w-full max-w-sm space-y-4">
            
            <div>
              <label htmlFor="email" className="sr-only">
                Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                // value={datas.email}
                // onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
                {/* {errors.email && <p className="ml-10 text-red-500 text-xs">{errors.email}</p>} */}

            </div>

           
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                // value={datas.password}
                // onChange={handleChange}
                className="w-full px-4 py-2 text-sm  border border-gray-300 rounded-md  focus:ring-orange-500 focus:border-orange-500"
              />
            {/* {errors.password && <p className="ml-10 text-red-500 text-xs">{errors.password}</p>} */}

            </div>

            
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            //   onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
