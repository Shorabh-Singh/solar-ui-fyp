import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const GridImportKPI = ({
  trend = "+15%",
  trendColor = "#d9534f"
}) => {
  const [inverterPower, setInverterPower] = useState(null);

  useEffect(() => {
    const powerRef = ref(db, "pzem/inverter/power");
    const unsubscribe = onValue(powerRef, snapshot => {
      setInverterPower(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  let value = "_";
  if (inverterPower !== null && inverterPower !== undefined) {
    const calculatedValue = inverterPower * 24;
    value = `${calculatedValue.toFixed(2)} kWh`;
  }

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="sign-in alternate" style={{ marginRight: 8, color: "#d9534f" }} />
        Grid Import
      </div>
      <div className="kpi-value" style={{ color: "#d9534f" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* {'↑'} {trend} from yesterday */}
      </div>
    </div>
  );
};

export default GridImportKPI;
