import React, { useEffect, useState } from "react";
import { db } from "../firebase";
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

  // Helper function for safe display
  const safeValue = value =>
    (value !== undefined && value !== null) ? value : "-";

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
          <td>{safeValue(sensorData.PV.current)}</td>
          <td>{safeValue(sensorData.Inverter.current)}</td>
          <td>{safeValue(sensorData.Grid.current)}</td>
        </tr>
        <tr>
          <td>Energy (kWh)</td>
          <td>{safeValue(sensorData.PV.energy)}</td>
          <td>{safeValue(sensorData.Inverter.energy)}</td>
          <td>{safeValue(sensorData.Grid.energy)}</td>
        </tr>
        <tr>
          <td>Frequency (Hz)</td>
          <td>{safeValue(sensorData.PV.frequency)}</td>
          <td>{safeValue(sensorData.Inverter.frequency)}</td>
          <td>{safeValue(sensorData.Grid.frequency)}</td>
        </tr>
        <tr>
          <td>PF</td>
          <td>{safeValue(sensorData.PV.pf)}</td>
          <td>{safeValue(sensorData.Inverter.pf)}</td>
          <td>{safeValue(sensorData.Grid.pf)}</td>
        </tr>
        <tr>
          <td>Power (W)</td>
          <td>{safeValue(sensorData.PV.power)}</td>
          <td>{safeValue(sensorData.Inverter.power)}</td>
          <td>{safeValue(sensorData.Grid.power)}</td>
        </tr>
        <tr>
          <td>Voltage (V)</td>
          <td>{safeValue(sensorData.PV.voltage)}</td>
          <td>{safeValue(sensorData.Inverter.voltage)}</td>
          <td>{safeValue(sensorData.Grid.voltage)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SensorTable;
