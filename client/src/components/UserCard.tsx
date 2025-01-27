import { useSocket } from "../context/socketContext";
import styles from "./components.module.css";
const UserCard = () => {
  const { socket, name, isRegister } = useSocket();

  return (
    <>
      {isRegister && (
        <>
          <div className={styles.cardHolder}>
            <div className={styles.card}>
              <b>ID</b>
              <span>{socket.id}</span>
            </div>

            <div className={styles.card}>
              <b>Name</b>
              <span>{name}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserCard;
