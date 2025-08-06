import React from 'react';

const LoginIllustration: React.FC = () => {
  return (
    <section
      className='hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 items-center justify-center m-3 p-5  relative rounded-tl-xl lg:rounded-r-xl lg:rounded-bl-[55px] lg:rounded-br-xl  overflow-hidden'
      aria-labelledby='illustration-heading'
      role='img'
      aria-describedby='illustration-description'
    >
      {/* Background geometric elements */}
      <div
        className='absolute top-16 right-20 w-4 h-4 bg-yellow-400 transform rotate-45 opacity-80'
        aria-hidden='true'
      ></div>
      <div
        className='absolute top-32 left-16 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-400 opacity-60'
        aria-hidden='true'
      ></div>
      <div
        className='absolute bottom-20 left-20 w-6 h-6 rounded-full bg-green-400 opacity-70'
        aria-hidden='true'
      ></div>
      <div
        className='absolute bottom-32 right-16 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-yellow-400 opacity-50'
        aria-hidden='true'
      ></div>

      {/* Main content container */}
      <div className='text-center text-white relative z-10 max-w-md xl:max-w-lg'>
        {/* 3D Character illustration container */}
        <div className='mb-8 relative' aria-hidden='true'>
          <div className='w-64 h-64 xl:w-80 xl:h-80 mx-auto relative flex items-center justify-center'>
            {/* Hexagonal background frame */}
            <div
              className='absolute w-48 h-48 xl:w-64 xl:h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30'
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            ></div>

            {/* Character - 3D person with laptop */}
            <div className='relative z-10'>
              <div className='w-36 h-36 xl:w-48 xl:h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative'>
                <div className='text-center'>
                  <div
                    className='text-5xl xl:text-7xl mb-2'
                    role='img'
                    aria-label='Person working on laptop'
                  >
                    👨‍💻
                  </div>
                  <div className='w-16 h-8 xl:w-20 xl:h-12 bg-gray-300 rounded-md mx-auto opacity-80'></div>
                </div>
              </div>

              {/* Floating elements */}
              <div className='absolute -top-3 -right-3 xl:-top-4 xl:-right-4 w-6 h-6 xl:w-8 xl:h-8 bg-green-400 rounded-full animate-bounce shadow-lg'></div>
              <div className='absolute -bottom-4 -left-4 xl:-bottom-6 xl:-left-6 w-8 h-8 xl:w-10 xl:h-10 bg-yellow-400 rounded-full opacity-80 animate-pulse shadow-lg'></div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <h2 id='illustration-heading' className='text-3xl xl:text-4xl font-bold mb-4 leading-tight'>
          Manage your virtual office with alldayPA
        </h2>
        <p
          id='illustration-description'
          className='text-base xl:text-lg opacity-90 mb-8 leading-relaxed'
        >
          you can Manage your virtual office on the go with the web
        </p>

        {/* Dots pagination */}
        <nav aria-label='Illustration pagination' className='flex justify-center gap-2'>
          <div className='w-2 h-2 bg-white bg-opacity-30 rounded-full' aria-label='Page 1'></div>
          <div className='w-8 h-2 bg-white rounded-full' aria-label='Current page, page 2'></div>
          <div className='w-2 h-2 bg-white bg-opacity-30 rounded-full' aria-label='Page 3'></div>
        </nav>
      </div>
    </section>
  );
};

export default LoginIllustration;
