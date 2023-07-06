import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import logo from "./logo.png";

const Dashboard = ({ accessToken }) => {
  const [trips, setTrips] = useState([]);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          "https://sandbox.blinkapi.co/v1/travel/trips",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X"
            }
          }
        );
        console.log(response.data.trips);
        setTrips(response.data.trips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    const fetchPassengers = async () => {
      try {
        const response = await axios.get(
          "https://sandbox.blinkapi.co/v1/travel/passengers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              "x-api-key": "Zgz4NhoIqZ1PJ6vw49K9N9hdWB7dGnWD29kXxg7X"
            }
          }
        );
        setPassengers(response.data.passengers);
        console.log(response.data.passengers);
      } catch (error) {
        console.error("Failed to fetch passengers:", error);
      }
    };

    fetchTrips();
    fetchPassengers();
  }, [accessToken]);

  return (
    <div className="dashboard">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="table-container">
        <table className="trip-table">
          <caption>Trips</caption>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Flight Number</th>
              <th>OriginAirport</th>
              <th>Embark Date</th>
              <th> Trip Type </th>
              <th>PolicyNumber</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(trips) && trips.length > 0 ? (
              trips.map((trip) => (
                <tr key={trip.tripId}>
                  <td>{trip.flights[0].direction}</td>
                  <td>{trip.flights[0].flightNumber}</td>
                  <td>{trip.flights[0].originAirport}</td>
                  <td>{trip.flights[0].embarkDate}</td>
                  <td>{trip.type}</td>
                  <td>{trip.policyNumber}</td>      
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No trips found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <table className="passenger-table">
          <caption>Passengers</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th> Mobile </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(passengers) && passengers.length > 0 ? (
              passengers.map((passenger) => (
                <tr key={passenger.passengerId}>
                  <td>{passenger.name}</td>
                  <td>{passenger.surname}</td>
                  <td>{passenger.mobilePhoneNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No passengers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
