import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { VITE_SERVER } from "../constants/config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoadingUser(true);
      const res = await axios.get(`${VITE_SERVER}/user/`, {
        withCredentials: true,
      });

      const userData = res.data?.user || null;
      setUser(userData);

      // If user has no subscription yet, skip the API call safely
      if (!userData?.subscription) {
        setSubscription(null);
        setLoadingSubscription(false);
        return;
      }

      setLoadingSubscription(true);
      const subRes = await axios.get(
        `${VITE_SERVER}/payments/${userData.subscription}`,
        {
          withCredentials: true,
        }
      );
      setSubscription(subRes.data?.subscription || null);
    } catch (error) {
      console.error(
        "❌ Failed to fetch user profile/subscription:",
        error.message,
        error
      );
      // fallback to safe empty state
      setUser(null);
      setSubscription(null);
    } finally {
      setLoadingUser(false);
      setLoadingSubscription(false);
    }
  }, []);

  // ✅ Logout function
  const logout = useCallback(async () => {
    try {
      await axios.get(`${VITE_SERVER}/auth/signout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setUser(null);
      setSubscription(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      subscription,
      setSubscription,
      loadingUser,
      loadingSubscription,
      fetchUserProfile,
      logout,
    }),
    [
      user,
      subscription,
      loadingUser,
      loadingSubscription,
      fetchUserProfile,
      logout,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
