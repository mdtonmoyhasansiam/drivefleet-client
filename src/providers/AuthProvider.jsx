"use client";

import {
  AuthProvider as Provider,
} from "@/hooks/useAuth";

const AuthProvider = ({
  children,
}) => {

  return (
    <Provider>
      {children}
    </Provider>
  );
};

export default AuthProvider;