import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { UserAuth } from '../contexts/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, loading, signinWithGoogle } = UserAuth();
  
  useEffect(() => {
    if (currentUser) {
      navigate("/chat"); // Redirect to chat page if user is authenticated
      console.log("Current user:", currentUser);
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
<div 
  className="hero min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
  style={{ backgroundImage: "url('https://res.cloudinary.com/de5sm2jjl/image/upload/v1743588870/9731562_ho195c.jpg')" }}
>
      <div className="hero-content text-center">
        <div className="max-w-md p-8 bg-white shadow-2xl rounded-lg">
          {loading ? (
            <p className="text-lg font-semibold">Authenticating...</p>
          ) : (
            <>
              <h1 className="text-4xl text-blue-500 font-bold">Welcome to Chat Simulator</h1>
              <p className="py-4 text-gray-600">
                Engage in lifelike AI-powered conversations. Connect seamlessly and start chatting instantly!
              </p>
              <div className='flex flex-col items-center'>
              <button 
                onClick={handleLogin} 
                className="btn btn-neutral flex items-center gap-2 text-lg py-3 px-6 rounded-lg mt-4"
              >
                <FcGoogle className="text-2xl" /> Login with Google
              </button>
              <Link to="/" className="text-xl text-blue-500 font-bold">Home</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
