import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import { Table, Icon, Segment, Header } from "semantic-ui-react";
import "./SensorTable.css";

function SensorTable() {
  const [sensorData, setSensorData] = useState({
    load: {},
    grid: {},
    inverter: {}
  });

  useEffect(() => {
    const dataRef = ref(db, "pzem");
    const unsubscribe = onValue(dataRef, snapshot => {
      setSensorData(snapshot.val() || { load: {}, grid: {}, inverter: {} });
    });
    return () => unsubscribe();
  }, []);

  const safeValue = value =>
    (value !== undefined && value !== null) ? value : "_";

  const parameters = [
    { label: "Current (A)", key: "current", icon: "bolt" },
    { label: "Energy (kWh)", key: "energy", icon: "battery full" },
    { label: "Frequency (Hz)", key: "frequency", icon: "sync" },
    { label: "Power Factor", key: "pf", icon: "percent" },
    { label: "Power (kW)", key: "power", icon: "lightning" },
    { label: "Voltage (V)", key: "voltage", icon: "plug" }
  ];

  return (
    <div className="sensor-table-center">
      <Segment padded="very" raised className="sensor-table-segment">
        <Header   as="h2"
  icon
  textAlign="center"
  color="green"
  style={{ marginBottom: "3rem" }} 
>
          <Icon name="microchip" circular />
          <Header.Content>Live Sensor Data</Header.Content>
        </Header>
        <Table celled striped textAlign="center" className="sensor-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Parameter</Table.HeaderCell>
              <Table.HeaderCell>PV ( Load )</Table.HeaderCell>
              <Table.HeaderCell>Grid</Table.HeaderCell>
              <Table.HeaderCell>Inverter</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {parameters.map(param => (
              <Table.Row key={param.key}>
                <Table.Cell textAlign="left">
                  <Icon name={param.icon} color="teal" /> {param.label}
                </Table.Cell>
                <Table.Cell>
                  <span className="sensor-value">{safeValue(sensorData.load[param.key])}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="sensor-value">{safeValue(sensorData.grid[param.key])}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="sensor-value">{safeValue(sensorData.inverter[param.key])}</span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

export default SensorTable;
 