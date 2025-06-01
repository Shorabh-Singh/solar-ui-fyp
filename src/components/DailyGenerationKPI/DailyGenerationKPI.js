import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const DailyGenerationKPI = ({
  trend = "+4.2%",
  trendColor = "#12826c"
}) => {
  const [energy, setEnergy] = useState(null);

  useEffect(() => {
    const energyRef = ref(db, "pzem/load/energy");
    const unsubscribe = onValue(energyRef, snapshot => {
      setEnergy(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  let value = "_";
  if (energy !== null && energy !== undefined) {
    const calculatedValue = energy * 24;
    value = `${calculatedValue.toFixed(2)} kWh`;
  }

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="sun" style={{ marginRight: 8, color: "#fbbd08" }} />
        Daily Generation
      </div>
      <div className="kpi-value" style={{ color: "#12826c" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* ↑ {trend} from yesterday */}
      </div>
    </div>
  );
};

export default DailyGenerationKPI;
