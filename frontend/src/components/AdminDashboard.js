import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const AdminDashboard = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("_id");
		localStorage.removeItem("_myEmail");
		navigate("/");
	};

	
  const user = {
    name: "John Doe",
    availableSlots: [
      { day: "Monday", start: "09:00 AM", end: "11:00 AM" },
      { day: "Wednesday", start: "01:00 PM", end: "03:00 PM" },
      { day: "Friday", start: "10:00 AM", end: "12:00 PM" },
    ],
  };

	return (
		<div>
			<nav className='dashboard__nav'>
				<h2>BookMe</h2>
				<button onClick={handleLogout} className='logout__btn'>
					Log out
				</button>
			</nav>
			<main className='dashboard__main'>
				<h2 className='dashboard__heading'>Admin Dashboard</h2>
				<div style={styles.container}>
				<UserCard userName={user.name+"1"} availableSlots={user.availableSlots} />
				<UserCard userName={user.name+"2"} availableSlots={user.availableSlots} />
				<UserCard userName={user.name+"3"} availableSlots={user.availableSlots} />
				<UserCard userName={user.name + "4"} availableSlots={user.availableSlots} />
					<UserCard userName={user.name + "5"} availableSlots={user.availableSlots} />
					<UserCard userName={user.name+"6"} availableSlots={user.availableSlots} />
				</div>
			</main>
		</div>
	);
};

const styles = {
	container: { 
    display: "flex", 
    justifyContent: "space-around", 
    flexWrap: "wrap", 
  },
};

export default AdminDashboard;
