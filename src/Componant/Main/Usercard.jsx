import React, { useState, useEffect } from "react";
import "./Usercard.css";

function Usercard() {
  const [users, setUsers] = useState([]);
  const [selecteduser, setSelecteduser] = useState(null);

  useEffect(() => {
    fetch(
      "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
        setUsers(data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function onClick(user) {
    setSelecteduser(user);
  }

  return (
    <>
      <div className="card">
        <header className="user-header">
          <h1>DATA SHOW IN CARD PAGE</h1>
          {selecteduser && (
            <>
              
              <div className="user-card-p">
              <div>
                <img
                  src={selecteduser.picture?.thumbnail || ""}
                  alt={`${selecteduser.name.first} ${selecteduser.name.last}`}
                />
              </div>
                <h1>{`${selecteduser.name.title} ${selecteduser.name.first} ${selecteduser.name.last}`}</h1>
                <p>
                  {selecteduser.location.street.number},{" "}
                  {selecteduser.location.street.name},{" "}
                  {selecteduser.location.city}, {selecteduser.location.country},{" "}
                  {selecteduser.location.postcode}
                </p>
                <p>
                  {selecteduser.location.timezone.offset}-
                  {selecteduser.location.timezone.description}
                </p>
                <p>{selecteduser.gender}</p>
              </div>
            </>
          )}

          <div className="user-list">
            <>
              {users.map((user, i) => (
                <div className="user-card" onClick={() => onClick(user)}>
                  <>
                    {/* <div>
                      <img
                        src={user.picture?.thumbnail || ""}
                        alt={`${user.name.first} ${user.name.last}`}
                      />
                    </div> */}
                    <div>
                      <h1>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
                      <p>
                        {user.location.street.number},
                        {user.location.street.name}, {user.location.city},
                        {user.location.country}, {user.location.postcode}
                      </p>
                      <p>
                        {user.location.timezone.offset}-
                        {user.location.timezone.description}
                      </p>
                      <p>{user.gender}</p>
                    </div>
                  </>
                </div>
              ))}
            </>
          </div>
        </header>
      </div>
    </>
  );
}

export default Usercard;
