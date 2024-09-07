import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ userName, availableSlots }) => {
  return (
    
    <div style={styles.card}>
      <h2 style={styles.userName}>{userName}</h2>
      <div style={styles.slotsContainer}>
        <h4>Available Time Slots</h4>
        {availableSlots.length > 0 ? (
          <ul style={styles.slotList}>
            {availableSlots.map((slot, index) => (
              <li key={index} style={styles.slotItem}>
                {slot.day}: {slot.start} - {slot.end}
              </li>
            ))}
          </ul>
        ) : (
          <p>No available time slots this week.</p>
        )}
      </div>
      </div>
      
  );
};

UserCard.propTypes = {
  userName: PropTypes.string.isRequired,
  availableSlots: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: "16px", /* <--- Updated to allow space around cards */
    textAlign: "center",
  },
  userName: {
    fontSize: "24px",
    marginBottom: "12px",
  },
  slotsContainer: {
    marginTop: "16px",
  },
  slotList: {
    listStyleType: "none",
    padding: 0,
  },
  slotItem: {
    marginBottom: "8px",
    fontSize: "16px",
  },
  container: { /* <--- New container style for flexbox layout */
    display: "flex", /* <--- Flex display for card layout */
    justifyContent: "space-around", /* <--- Space around the cards */
    flexWrap: "wrap", /* <--- Wrap cards to next line if needed */
  },
};

export default UserCard;
