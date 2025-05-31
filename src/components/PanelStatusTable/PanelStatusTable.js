// src/components/PanelStatusTable.js
import React from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import { useRelays } from "../../hooks/useRelays";
import "./PanelStatusTable.css";

const relayNames = [
  { key: "relay1", label: "Load 1 - Bulb" },
  { key: "relay2", label: "Load 2 - Fan" },
  { key: "relay3", label: "Load 3 - Water Heater" },
  { key: "relay4", label: "Load 4 - Motor" }
];

const PanelStatusTable = () => {
  const { relays, toggleRelay, setAllRelays } = useRelays();

  const allEnabled = relayNames.every(r => relays[r.key]);
  const allDisabled = relayNames.every(r => !relays[r.key]);

  return (
    <div className="panel-status-table--wrapper">
      <Table unstackable celled compact definition className='panel-status-table--table'>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Enabled</Table.HeaderCell>
            <Table.HeaderCell>Load</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {relayNames.map(relay => (
            <Table.Row key={relay.key}>
              <Table.Cell collapsing>
                <Checkbox
                  slider
                  checked={!!relays[relay.key]}
                  onChange={(e, data) => toggleRelay(relay.key, data.checked)}
                />
              </Table.Cell>
              <Table.Cell className="panel-status-table--data-cell">{relay.label}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='2'>
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
    </div>
  );
};

export default PanelStatusTable;
