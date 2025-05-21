import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";

function SensorTable() {
  const [sensorData, setSensorData] = useState({
    PV: {},
    Inverter: {},
    Grid: {}
  });

  useEffect(() => {
    const sources = ["PV", "Inverter", "Grid"];
    const unsubscribes = sources.map(source => {
      const dataRef = ref(db, `sensors/${source}`);
      return onValue(dataRef, snapshot => {
        setSensorData(prev => ({
          ...prev,
          [source]: snapshot.val() || {}
        }));
      });
    });
    // Cleanup listeners on unmount
    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>PV</th>
          <th>Inverter</th>
          <th>Grid</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current (A)</td>
          <td>{sensorData.PV.current ?? "-"}</td>
          <td>{sensorData.Inverter.current ?? "-"}</td>
          <td>{sensorData.Grid.current ?? "-"}</td>
        </tr>
        <tr>
          <td>Energy (kWh)</td>
          <td>{sensorData.PV.energy ?? "-"}</td>
          <td>{sensorData.Inverter.energy ?? "-"}</td>
          <td>{sensorData.Grid.energy ?? "-"}</td>
        </tr>
        <tr>
          <td>Frequency (Hz)</td>
          <td>{sensorData.PV.frequency ?? "-"}</td>
          <td>{sensorData.Inverter.frequency ?? "-"}</td>
          <td>{sensorData.Grid.frequency ?? "-"}</td>
        </tr>
        <tr>
          <td>PF</td>
          <td>{sensorData.PV.pf ?? "-"}</td>
          <td>{sensorData.Inverter.pf ?? "-"}</td>
          <td>{sensorData.Grid.pf ?? "-"}</td>
        </tr>
        <tr>
          <td>Power (W)</td>
          <td>{sensorData.PV.power ?? "-"}</td>
          <td>{sensorData.Inverter.power ?? "-"}</td>
          <td>{sensorData.Grid.power ?? "-"}</td>
        </tr>
        <tr>
          <td>Voltage (V)</td>
          <td>{sensorData.PV.voltage ?? "-"}</td>
          <td>{sensorData.Inverter.voltage ?? "-"}</td>
          <td>{sensorData.Grid.voltage ?? "-"}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SensorTable;
