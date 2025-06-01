import React, { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "../KPICards.css";

const ZSourceEfficiencyKPI = ({
  trend = "+0.5%",
  trendColor = "#12826c"
}) => {
  const [inverterPower, setInverterPower] = useState(null);
  const [loadPower, setLoadPower] = useState(null);

  useEffect(() => {
    const inverterRef = ref(db, "pzem/inverter/power");
    const loadRef = ref(db, "pzem/load/power");

    const unsubInverter = onValue(inverterRef, snapshot => {
      setInverterPower(snapshot.val());
    });
    const unsubLoad = onValue(loadRef, snapshot => {
      setLoadPower(snapshot.val());
    });

    return () => {
      unsubInverter();
      unsubLoad();
    };
  }, []);

  let value = "_";
  if (
    inverterPower !== null &&
    inverterPower !== undefined &&
    loadPower !== null &&
    loadPower !== undefined &&
    Number(loadPower) !== 0
  ) {
    const efficiency = (Number(inverterPower) / Number(loadPower)) * 100;
    value = `${efficiency.toFixed(1)}%`;
  }

  return (
    <div className="kpi-block">
      <div className="kpi-label">
        <Icon name="settings" style={{ marginRight: 8, color: "#12826c" }} />
        Z-Source Inverter Efficiency
      </div>
      <div className="kpi-value" style={{ color: "#12826c" }}>{value}</div>
      <div className="kpi-subtext" style={{ color: trendColor }}>
        {/* ↑ {trend} from yesterday */}
      </div>
    </div>
  );
};

export default ZSourceEfficiencyKPI;
