import React from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <NavBar />
      <div className='pt-20 text-gray-800 '>
        {/* Hero Section */}
        <div className='hero bg-gradient-to-r  from-blue-500 to-indigo-600 text-white min-h-screen px-10 flex items-center justify-center'>
          <div className='hero-content px-10 flex-col lg:flex-row-reverse text-center lg:text-left'>
            <img
              src='https://res.cloudinary.com/de5sm2jjl/image/upload/v1743588883/7563799_b5fyfl.jpg'
              className='max-w-sm rounded-lg shadow-2xl' />
            <div>
              <h1 className='text-2xl md:text-5xl px-10 font-extrabold'>Seamless Chat Experience</h1>
              <p className='py-6 text-1xl md:text-2xl px-10'>
                Engage in real-time conversations with auto-scrolling, typing indicators, multiple chat rooms, and a customizable user interface. Experience fluid messaging with message editing, clear chat options, and chat history storage.
              </p>
              <Link to='/login' className='px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300'>Start Chatting</Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className='p-10 bg-cover bg-center' style={{ backgroundImage: "url('https://res.cloudinary.com/de5sm2jjl/image/upload/v1743588870/9731562_ho195c.jpg')" }}>
          <h2 className='text-3xl font-bold text-center text-white'>Key Features</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Chat History</h3>
              <p className='text-sm text-gray-600'>Access previous conversations anytime with our intuitive chat history feature.</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Auto Scroll Messaging</h3>
              <p className='text-sm text-gray-600'>New messages automatically scroll into view, ensuring a smooth chat experience.</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Typing Indicator</h3>
              <p className='text-sm text-gray-600'>See when others are typing in real-time for more natural conversations.</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Multiple Chat Rooms</h3>
              <p className='text-sm text-gray-600'>Join different chat rooms to engage in various topics with unique participants.</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Message Editing</h3>
              <p className='text-sm text-gray-600'>Edit sent messages to correct typos or clarify content.</p>
            </div>
            <div className='p-6 bg-white shadow-md rounded-xl'>
              <h3 className='font-semibold text-1xl md:text-2xl'>Clear Chat</h3>
              <p className='text-sm text-gray-600'>Easily clear chats for a fresh conversation without losing access to chat history.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className='p-10 bg-gray-100 text-center'>
          <h2 className='text-3xl font-bold'>Frequently Asked Questions</h2>
          <div className='join join-vertical mt-6 max-w-2xl mx-auto'>
            <div className='collapse collapse-arrow join-item border border-gray-300'>
              <input type='radio' name='faq-accordion' defaultChecked />
              <div className='collapse-title font-semibold'>How do I create a chat room?</div>
              <div className='collapse-content text-sm'>Go to the chat dashboard and click "Create Room (+ icon)" to start a new conversation space.</div>
            </div>
            <div className='collapse collapse-arrow join-item border border-gray-300'>
              <input type='radio' name='faq-accordion' />
              <div className='collapse-title font-semibold'>Can I edit a sent message?</div>
              <div className='collapse-content text-sm'>Yes, locate the Edit under the  message and select "Edit" to modify your text.</div>
            </div>
            <div className='collapse collapse-arrow join-item border border-gray-300'>
              <input type='radio' name='faq-accordion' />
              <div className='collapse-title font-semibold'>How do I enable typing indicators?</div>
              <div className='collapse-content text-sm'>Typing indicators are enabled by default in chat settings.</div>
            </div>
            <div className='collapse collapse-arrow join-item border border-gray-300'>
              <input type='radio' name='faq-accordion' />
              <div className='collapse-title font-semibold'>Can i delate a sent message?</div>
              <div className='collapse-content text-sm'>Yes, locate the Edit under the  message and select "Delete".</div>
            </div>
            <div className='collapse collapse-arrow join-item border border-gray-300'>
              <input type='radio' name='faq-accordion' />
              <div className='collapse-title font-semibold'>Can i clear chat from each group?</div>
              <div className='collapse-content text-sm'>Yes, locate the clear chat on the right left coner of the chat  message and select to comfirm.</div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
