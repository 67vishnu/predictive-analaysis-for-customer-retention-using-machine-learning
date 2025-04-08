
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    alerts: boolean;
    autoPay: boolean;
    dataAlerts: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USER: User = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@telecom.com",
  avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff",
  preferences: {
    alerts: true,
    autoPay: false,
    dataAlerts: true,
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("telecom_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setUser(MOCK_USER);
          setIsAuthenticated(true);
          localStorage.setItem("telecom_user", JSON.stringify(MOCK_USER));
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 1000);
    });
  };

  const loginWithGoogle = async () => {
    // Simulate Google login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(MOCK_USER);
        setIsAuthenticated(true);
        localStorage.setItem("telecom_user", JSON.stringify(MOCK_USER));
        resolve();
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate signup
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const newUser = {
            ...MOCK_USER,
            name,
            email,
            avatar: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=0D8ABC&color=fff`
          };
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem("telecom_user", JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error("All fields are required"));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("telecom_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("telecom_user", JSON.stringify(updatedUser));
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    // Simulate password change
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword && newPassword) {
          resolve();
        } else {
          reject(new Error("All fields are required"));
        }
      }, 1000);
    });
  };

  const deleteAccount = async () => {
    // Simulate account deletion
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("telecom_user");
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginWithGoogle,
      signup,
      logout,
      updateProfile,
      changePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
