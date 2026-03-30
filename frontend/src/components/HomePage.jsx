import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  if (!authUser || !authUser._id) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4
     ">

        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl
        shadow-2xl text-center max-w-md w-full
        border border-white/20">

          <div className="text-5xl mb-3">💬</div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Chattar
          </h1>

          <p className="text-white/70 mb-6">
            Welcome to Chattar. please do login to use chattar.
          </p>

          <div className="flex flex-col gap-3">

            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 rounded-lg
              bg-gradient-to-r from-[#063b2b] to-[#0f5e3d]
              hover:from-[#07543b] hover:to-[#148a5a]
              text-white font-medium shadow-lg
              transition duration-200 active:scale-95"
            >
              Login
            </button>

            <button
              onClick={() => navigate('/register')}
              className="w-full py-2 rounded-lg
              bg-white/10 hover:bg-white/15
              border border-white/20
              text-white/80 font-medium
              backdrop-blur-xl
              transition duration-200"
            >
              Create Account
            </button>

          </div>

          {/* <p className="text-xs text-white/40 mt-5">
            Secure • Fast • Real-time chat ⚡
          </p> */}

        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row
      h-screen md:h-[550px]
      rounded-none md:rounded-2xl
      overflow-hidden
      bg-white/10 backdrop-blur-2xl
      border border-white/20 shadow-xl'>

      <Sidebar />
      <MessageContainer />

    </div>
  )
}

export default HomePage;