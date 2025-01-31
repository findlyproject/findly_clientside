export default function ContactUsPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 p-6 md:p-12">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-[450px] md:h-auto bg-cover bg-center rounded-lg flex flex-col justify-between p-6 md:p-10 text-white"
        style={{ backgroundImage: 'url(https://i.pinimg.com/736x/0a/13/88/0a13881a956c896d35b06e61dc038ece.jpg)' }}>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Contact us</h2>
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-lg text-white">
          <p className="flex items-center mb-2"><span className="mr-2">📞</span> 470-601-1911</p>
          <p className="flex items-center mb-2"><span className="mr-2">📧</span> Pagedone1234@gmail.com</p>
          <p className="flex items-center"><span className="mr-2">📍</span> 654 Sycamore Avenue, Meadowville, WA 76543</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-purple-700">Send Us A Email</h2>
        <form className="mt-4 space-y-4">
          
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
         

          
          <textarea placeholder="Message" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"></textarea>
          <button type="submit" className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Send</button>
        </form>
      </div>
    </div>
  );
}
