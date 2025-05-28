import React, {Component} from 'react';
import {Container, Grid, Header, Segment, Card, Icon} from 'semantic-ui-react';
import ZSourceEfficiencyKPI from "../../components/ZSourceEfficiencyKPI/ZSourceEfficiencyKPI";
import PowerOutputPV from "../PowerOutputKPI_PV/PowerOutputPV";
import PowerOutputInverter from "../PowerOutputKPI_Inverter/PowerOutputInverter";
import PowerOutputGrid from "../PowerOutputKPI_Grid/PowerOutputGrid";
import DailyGenerationKPI from "../../components/DailyGenerationKPI/DailyGenerationKPI";
import DailyConsumptionKPI from "../../components/DailyConsumptionKPI/DailyConsumptionKPI";
import GridImportKPI from "../../components/GridImportKPI/GridImportKPI";
import GridExportKPI from "../../components/GridExportKPI/GridExportKPI";
//import LatestEventsFeedContainer from "../../containers/LatestEventsFeedContainer";
import PanelStatusTableContainer from "../../containers/PanelStatusTableContainer";
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview' subheader='System status in a nutshell'/>
        <Grid stackable stretched>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
   <PowerOutputPV value="3.2 kW" trend="8.5%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
   <PowerOutputInverter value="3.2 kW" trend="8.5%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
   <PowerOutputGrid value="3.2 kW" trend="8.5%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
  <ZSourceEfficiencyKPI value="97.8%" trend="0.5%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
  <DailyGenerationKPI value="18.4 kWh" trend="4.2%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
   <DailyConsumptionKPI value="12.7 kWh" trend="2.1%" trendColor="#d9534f" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
   <GridImportKPI value="1.2 kWh" trend="+15%" trendColor="#d9534f" />
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
  <GridExportKPI value="6.9 kWh" trend="+8.3%" trendColor="#12826c" />
          </Grid.Column>
          <Grid.Column width={16}>
<Segment className="panel-status-table--segment">
  <Header icon='sliders horizontal' content='Load Status'/>
  <p>Status of each load.</p>
  <PanelStatusTableContainer/>
</Segment>
          </Grid.Column>
          {/* Environmental Prediction Column */}
          <Grid.Column width={16}>
            <Segment>
              <Header icon='cloud sun' content='Environmental Prediction'/>
              <Card.Group itemsPerRow={3} stackable>
                {/* Today */}
                <Card>
                  <Card.Content>
                    <Card.Header>Today</Card.Header>
                    <Card.Meta>
                      <span>
                        <Icon name='sun' /> Irradiation: <b>5.8 kWh/m²</b>
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      <div>
                        <Icon name='thermometer half' /> Temperature: <b>28°C</b>
                      </div>
                      <div>
                        <Icon name='tint' /> Humidity: <b>45%</b>
                      </div>
                      <div style={{marginTop: '0.5em'}}>
                        Expected Generation: <span style={{color: '#21ba45', fontWeight: 'bold'}}>21.4 kWh</span>
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
                {/* Tomorrow */}
                <Card>
                  <Card.Content>
                    <Card.Header>Tomorrow</Card.Header>
                    <Card.Meta>
                      <span>
                        <Icon name='sun' /> Irradiation: <b>5.6 kWh/m²</b>
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      <div>
                        <Icon name='thermometer half' /> Temperature: <b>26°C</b>
                      </div>
                      <div>
                        <Icon name='tint' /> Humidity: <b>50%</b>
                      </div>
                      <div style={{marginTop: '0.5em'}}>
                        Expected Generation: <span style={{color: '#21ba45', fontWeight: 'bold'}}>20.1 kWh</span>
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
                {/* Day After */}
                <Card>
                  <Card.Content>
                    <Card.Header>Day After</Card.Header>
                    <Card.Meta>
                      <span>
                        <Icon name='sun' /> Irradiation: <b>4.9 kWh/m²</b>
                      </span>
                    </Card.Meta>
                    <Card.Description>
                      <div>
                        <Icon name='thermometer half' /> Temperature: <b>24°C</b>
                      </div>
                      <div>
                        <Icon name='tint' /> Humidity: <b>65%</b>
                      </div>
                      <div style={{marginTop: '0.5em'}}>
                        Expected Generation: <span style={{color: '#21ba45', fontWeight: 'bold'}}>17.8 kWh</span>
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Card.Group>
              <div style={{marginTop: '1em', color: '#888', fontSize: '0.95em'}}>
                Prediction based on ML algorithm with 94% accuracy.
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
