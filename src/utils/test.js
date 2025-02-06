import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const Dashboard = () => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      // Fetch and log user details to the console
      oktaAuth.getUser().then((user) => {
        console.log("Authenticated User:", user);
      });
    }
  }, [authState, oktaAuth]);

  if (!authState || authState.isPending) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;