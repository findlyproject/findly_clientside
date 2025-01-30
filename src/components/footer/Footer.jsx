import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
   
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-gray-700 pt-8">
          <div>
            <h4 className="text-lg font-semibold">Findly</h4>
            <p className="text-gray-400 mt-2">Call now: <strong>(319) 555-0115</strong></p>
            <p className="text-gray-400 text-sm">6391 Elgin St. Celina, Delaware 10299, New York, United States</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Candidate</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Browse Employers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Candidate Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Saved Jobs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Employers</h4>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Post a Job</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Browse Candidates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Employers Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Applications</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
          <p className="text-gray-400">&copy; 2025 Findly - Job Portal. All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
