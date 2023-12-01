import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState()
  const userInSession = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState({
        picture: user?.picture,
        name: user?.username,
        email: user?.email,
        password: user?.password,
        address: "",
        phone: "",
        identityCard: "",
        postalCode: "",
        city: "",
        typeUser: ""
        })
    
        useEffect(() => {
          const fetchToken = async () => {
            try {
              const idTokenClaims = await getIdTokenClaims();
              const idToken = idTokenClaims?.__raw;
              setToken(idToken);
            } catch (error) {
              console.error('Error fetching id token:', error);
            }
          };
      
          if (isAuthenticated) {
            fetchToken();
          }
        }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>{user?.name}</h2>
        <h3>{user?.email}</h3>
      <p>{userInSession?.email}</p>
      <br/>
      <br/>
      <br/>
        <p>{token}</p>
        <br/>
      <br/>
      <br/>
      </div>
    )
  );
};

export default Profile;