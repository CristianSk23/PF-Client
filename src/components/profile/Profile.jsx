import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
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

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={userInfo?.picture} alt={userInfo?.name} />
        <h2>{userInfo?.name}</h2>
        <p>{userInfo?.email}</p>

      </div>
    )
  );
};

export default Profile;