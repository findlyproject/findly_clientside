import React from 'react'
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
     
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/illustration-social-media-concept_53876-9147.jpg?t=st=1738738972~exp=1738742572~hmac=7697e2c58c301eb52bc2c15b15800f0be106ae22e573fdcdccbc9d856d6735ea&w=826')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      ></div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
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
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-white-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            //   onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
    
    </div>
  )
}
