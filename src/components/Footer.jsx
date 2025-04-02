import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Define the current year

  return (
    <footer className='bg-blue-400 text-white text-center py-4 mt-10'>
      <p>&copy; {currentYear} Chat Simulation App. All rights reserved.</p>
    </footer>
  )
}

export default Footer
