import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  isPro: boolean;
  setIsPro: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // For now, this is a simple state. When auth is implemented,
  // this will be derived from Supabase user roles
  const [isPro, setIsPro] = useState(false);

  return (
    <UserContext.Provider value={{ isPro, setIsPro }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
