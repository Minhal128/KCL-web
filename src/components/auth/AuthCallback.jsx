import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setUser } = useUser();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    let user = {
      name,
      email,
    };

    if (token) {
      // Redirect to dashboard
      setUser(user);
      setTimeout(() => {
        navigate("/dashboard/home", { replace: true });
      }, 500);
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="bg-[#173867] flex items-center justify-center w-full h-screen">
      <div>
        <h2 className="text-2xl text-white">Logging you in...</h2>
        <p className="text-lg text-zinc-300">Please wait a moment.</p>
      </div>
    </div>
  );
}

export default AuthCallback;
