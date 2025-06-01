import React, { useEffect, useState } from "react";
import { Button, Checkbox, Table, Icon, Popup } from "semantic-ui-react";
import { useRelays } from "../../hooks/useRelays";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import "./PanelStatusTable.css";

const relayNames = [
  { key: "relay1", label: "Bulb" },
  { key: "relay2", label: "Fan" },
  { key: "relay3", label: "Motor" },
  { key: "relay4", label: "Water Heater" }
];

const PanelStatusTable = () => {
  const { relays, toggleRelay, setAllRelays } = useRelays();

  // State for sensor values
  const [sensor, setSensor] = useState({
    gridVoltage: null,
    gridCurrent: null,
    solarPower: null,
  });

  // Fetch sensor values from Firebase
  useEffect(() => {
    const sensorRef = ref(db, "pzem");
    const unsub = onValue(sensorRef, (snap) => {
      const data = snap.val() || {};
      setSensor({
        gridVoltage: data.grid?.voltage ?? null,
        gridCurrent: data.grid?.current ?? null,
        solarPower: data.load?.power ?? null,
      });
    });
    return () => unsub();
  }, []);

  // Conditional logic
  const autoDisabled = {
    relay1: sensor.solarPower !== null && sensor.solarPower < 250, // Bulb
    relay3: sensor.gridVoltage !== null && sensor.gridVoltage < 200 ||
            sensor.gridCurrent !== null && sensor.gridCurrent > 10, // Motor
    relay4: sensor.gridVoltage !== null && sensor.gridVoltage < 200 ||
            sensor.gridCurrent !== null && sensor.gridCurrent > 10, // Water Heater
  };

  // For relay2 (Fan), no auto-disable rule
  autoDisabled.relay2 = false;

  // Optionally, auto-disable in Firebase as well (one-way, not toggling back on)
  useEffect(() => {
    // Only turn OFF if condition met and relay is ON
    Object.entries(autoDisabled).forEach(([key, shouldDisable]) => {
      if (shouldDisable && relays[key]) {
        toggleRelay(key, false);
      }
    });
    // eslint-disable-next-line
  }, [autoDisabled.relay1, autoDisabled.relay3, autoDisabled.relay4]);

  const allEnabled = relayNames.every(r => relays[r.key]);
  const allDisabled = relayNames.every(r => !relays[r.key]);

  return (
    <div className="panel-status-table--wrapper">
      <Table unstackable celled compact definition className='panel-status-table--table'>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Enabled</Table.HeaderCell>
            <Table.HeaderCell>Load</Table.HeaderCell>
            <Table.HeaderCell>Auto</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {relayNames.map(relay => (
            <Table.Row key={relay.key}>
              <Table.Cell collapsing>
                <Popup
                  content={
                    autoDisabled[relay.key]
                      ? "Auto-disabled due to safety/efficiency rule"
                      : "Manual control"
                  }
                  trigger={
                    <span>
                      <Checkbox
                        slider
                        checked={!!relays[relay.key]}
                        onChange={(e, data) => toggleRelay(relay.key, data.checked)}
                        disabled={autoDisabled[relay.key]}
                      />
                    </span>
                  }
                />
              </Table.Cell>
              <Table.Cell className="panel-status-table--data-cell">{relay.label}</Table.Cell>
              <Table.Cell textAlign="center">
                {autoDisabled[relay.key] && (
                  <Popup
                    content="Auto-disabled"
                    trigger={<Icon name="exclamation triangle" color="orange" />}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Button.Group size='small'>
                <Button
                  basic
                  color='green'
                  disabled={allDisabled}
                  onClick={() => setAllRelays(false)}
                >
                  Disable All
                </Button>
                <Button
                  color='green'
                  disabled={allEnabled}
                  onClick={() => setAllRelays(true)}
                >
                  Enable All
                </Button>
              </Button.Group>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {/* Optional: Show current sensor values for debugging */}
      <div style={{ marginTop: 10, color: "#888", fontSize: "0.95em" }}>
        <b>Grid Voltage:</b> {sensor.gridVoltage ?? "_"} V &nbsp;|&nbsp;
        <b>Grid Current:</b> {sensor.gridCurrent ?? "_"} A &nbsp;|&nbsp;
        <b>Solar Power:</b> {sensor.solarPower ?? "_"} W
      </div>
    </div>
  );
};

export default PanelStatusTable;
