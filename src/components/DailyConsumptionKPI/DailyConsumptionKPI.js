import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const DailyConsumptionKPI = ({
  trend = "-2.1%",
  trendColor = "#d9534f"
}) => {
  const [voltage, setVoltage] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    const voltageRef = ref(db, "pzem/load/voltage");
    const currentRef = ref(db, "pzem/load/current");

    const unsubscribeVoltage = onValue(voltageRef, snapshot => {
      setVoltage(snapshot.val());
    });
    const unsubscribeCurrent = onValue(currentRef, snapshot => {
      setCurrent(snapshot.val());
    });

    return () => {
      unsubscribeVoltage();
      unsubscribeCurrent();
    };
  }, []);

  let value = "_";
  if (
    voltage !== null && voltage !== undefined &&
    current !== null && current !== undefined
  ) {
    const calculatedValue = voltage * current * 24;
    value = `${calculatedValue.toFixed(2)} kWh`;
  }

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="chart line" style={{ marginRight: 8, color: "#d9534f" }} />
        Daily Consumption
      </div>
      <div className="kpi-value" style={{ color: "#d9534f" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* {'↓'} {trend} from yesterday */}
      </div>
    </div>
  );
};

export default DailyConsumptionKPI;
