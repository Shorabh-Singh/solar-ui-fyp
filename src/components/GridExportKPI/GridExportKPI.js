import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const GridExportKPI = ({
  trend = "+8.3%",
  trendColor = "#12826c"
}) => {
  const [gridPower, setGridPower] = useState(null);

  useEffect(() => {
    const powerRef = ref(db, "pzem/grid/power");
    const unsubscribe = onValue(powerRef, snapshot => {
      setGridPower(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  let value = "_";
  if (gridPower !== null && gridPower !== undefined) {
    const calculatedValue = gridPower * 12;
    value = `${calculatedValue.toFixed(2)} kWh`;
  }

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="sign-out alternate" style={{ marginRight: 8, color: "#12826c" }} />
        Grid Export
      </div>
      <div className="kpi-value" style={{ color: "#12826c" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* {'↑'} {trend} from yesterday */}
      </div>
    </div>
  );
};

export default GridExportKPI;
