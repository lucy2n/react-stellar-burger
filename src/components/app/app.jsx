import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from '../appHeader/AppHeader';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
    </div>
  );
}

export default App;
