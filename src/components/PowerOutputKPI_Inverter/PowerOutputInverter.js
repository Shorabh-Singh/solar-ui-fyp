import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const PowerOutputInverter = ({ trend = "+8.5%", trendColor = "#12826c" }) => {
  const [power, setPower] = useState(null);

  useEffect(() => {
    const dataRef = ref(db, "pzem/inverter/power");
    const unsubscribe = onValue(dataRef, snapshot => {
      setPower(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  const value = power !== null && power !== undefined ? `${power} kW` : "_";

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="bolt" style={{ marginRight: 8, color: "#12826c" }} />
        Power Output (Inverter)
      </div>
      <div className="kpi-value" style={{ color: "#12826c" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* ↑ {trend} from yesterday */}
      </div>
    </div>
  );
};

export default PowerOutputInverter;
