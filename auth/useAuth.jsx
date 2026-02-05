import { useState, useEffect, useContext, createContext } from 'react';

// Create Auth context
const AuthContext = createContext(null);

// Hardcoded users with roles
const users = [
  { email: 'admin@example.com', password: 'adminpass', role: 'admin' },
  { email: 'doctor@example.com', password: 'doctorpass', role: 'doctor' },
  { email: 'nurse@example.com', password: 'nursepass', role: 'nurse' },
  { email: 'receptionist@example.com', password: 'receptionistpass', role: 'receptionist' },
  { email: 'pharmacist@example.com', password: 'pharmacistpass', role: 'pharmacist' },
  { email: 'labtech@example.com', password: 'labtechpass', role: 'lab technician' },
  { email: 'cashier@example.com', password: 'cashierpass', role: 'cashier' },
  { email: 'adminhospital@example.com', password: 'adminhospitalpass', role: 'hospital administrator' },
  { email: 'patient@example.com', password: 'patientpass', role: 'patient' },
  { email: 'triagenurse@example.com', password: 'triagenursepass', role: 'triage nurse' },
];

// Auth provider component
export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provide auth logic
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);

  // Simulate login function
  const login = async (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      const userData = { email: foundUser.email, role: foundUser.role };
      setUser(userData);
      setTwoFactorVerified(false); // Reset 2FA verification on login
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('twoFactorVerified', 'false');
      return true;
    } else {
      return false;
    }
  };

  // Simulate 2FA verification function
  const verify2FA = () => {
    setTwoFactorVerified(true);
    localStorage.setItem('twoFactorVerified', 'true');
  };

  // Simulate logout function
  const logout = () => {
    setUser(null);
    setTwoFactorVerified(false);
    localStorage.removeItem('user');
    localStorage.removeItem('twoFactorVerified');
  };

  // Load user and 2FA status from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const stored2FA = localStorage.getItem('twoFactorVerified');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (stored2FA === 'true') {
      setTwoFactorVerified(true);
    }
    setLoading(false);
  }, []);

  return {
    user,
    login,
    logout,
    loading,
    twoFactorVerified,
    verify2FA,
  };
};
