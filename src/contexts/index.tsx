import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { TaskProvider } from "./TasksContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <TaskProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </TaskProvider>
  </AuthProvider>
);
