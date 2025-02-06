import { useOktaAuth } from "@okta/okta-react";

const LogoutButton = () => {
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState?.isAuthenticated) return null;

  const logout = async () => {
    await oktaAuth.signOut();
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;