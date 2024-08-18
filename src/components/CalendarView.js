import React, { useEffect, useState } from "react";
import "./CalendarView.css";
import { Checkbox } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import svSE from "date-fns/locale/sv";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [isDateBookedState, setIsDateBookedState] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserAuth();

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "calendar"));
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // userName: doc.data().userId,
      }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleBooking = async (selectedDates) => {
    try {
      for (const date of selectedDates) {
        if (date) {
          const formattedDate = date.toISOString().split("T")[0];
          const bookingData = {
            booked: true,
            date: formattedDate,
            userId: user.uid,
            // userName: user.displayName || "Okänd användare",
          };

          await addDoc(collection(db, "calendar"), bookingData);
        }
      }
      getBookings();
      const bookingDates = selectedDates
        .filter((date) => date)
        .map((date) => date.toLocaleDateString());

      navigate("/ConfirmationPage", {
        state: { bookingDates },
      });
    } catch (error) {
      console.error("Error sending booking:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const isDateBooked = (date) => {
    return bookings.some(
      (booking) => booking.date === date.toISOString().split("T")[0]
    );
  };

  const customDateClass = (date) => {
    if (isDateBooked(date)) {
      return "booked-date";
    } else {
      return null;
    }
  };

  const handleDateClick = (date) => {
    if (isDateBooked(date)) {
      setMessage("Välj en annan ledig dag!");
      setIsDateBookedState(true);
    } else {
      setMessage("");
      setIsDateBookedState(false);
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleBookingClick = () => {
    if (!user) {
      setMessage("Logga in för att boka");
      navigate("/Login", { state: { from: "/CalendarView" } });
      return;
    }

    if (!startDate) {
      setMessage("Välj ett datum!");

      return;
    }

    if (isDateBooked(startDate) || (endDate && isDateBooked(endDate))) {
      setMessage("Välj en annan ledig dag!");
      setIsDateBookedState(true);
    } else {
      setMessage("");
      setIsDateBookedState(false);
      handleBooking([startDate, endDate]);
    }
  };

  return (
    <div className="DatePicker-Container">
      <h1 className="TrailerTitel"> {user ? "Boka släp" : "Lediga Datum"}</h1>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        onSelect={handleDateClick}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        locale={svSE}
        showWeekNumbers
        dayClassName={customDateClass}
        className="custom-datepicker"
      />
      {message && <p>{message}</p>}
      <div className={user ? "checkbox-container" : "checkbox-hidden"}>
        <div className="checkbox-text">
          <p>Ja, jag accepterar villkoren.</p>

          <Checkbox checked={isChecked} onChange={handleCheck} />
        </div>
      </div>
      {!user && <p>Logga in för att boka</p>}
      <div className="DatePickerBtn">
        <button
          className="TrailerBtn"
          onClick={handleBookingClick}
          disabled={!isChecked && user}
        >
          {user ? "Boka" : " Fortsätt"}
        </button>
        <button className="TrailerBtn" onClick={() => navigate("/")}>
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default Calendar;
