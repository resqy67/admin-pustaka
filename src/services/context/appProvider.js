import { AuthProvider } from "./auth";

// ini untuk menyimpan semua provider yang ada
export const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
