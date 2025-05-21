import React, {Component} from 'react';
import {Container, Grid, Header, Segment, Card, Icon} from 'semantic-ui-react';
import SolarRadianceChartContainer from "../../containers/SolarRadianceChartContainer";
import PowerOutputChartContainer from "../../containers/PowerOutputChartContainer";
import EnergyStorageChartContainer from "../../containers/EnergyStorageChartContainer";
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
            <Segment>
              <Header icon='bolt' content='Power Output'/>
              <p>Power output by the PV.</p>
              <PowerOutputChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='bolt' content='Power Output'/>
              <p>Power output by the Inverter.</p>
              <PowerOutputChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='bolt' content='Power Output'/>
              <p>Power output by the Grid.</p>
              <PowerOutputChartContainer/>
            </Segment>
          </Grid.Column>

          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='settings' content='Z-Source Inverter Efficiency' />
              <p>Efficiency of the Z-Source inverter.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>
        
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='sun' content='Daily Generation' />
              <p>Total energy generated today.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='chart line' content='Daily Consumption' />
              <p>Total energy consumed today.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='sign-in alternate' content='Grid Import' />
              <p>Power imported from the grid.</p>
              <SolarRadianceChartContainer/>
            </Segment>
          </Grid.Column>

          <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='sign-out alternate' content='Grid Export' />
              <p>Power exported to the grid.</p>
              <EnergyStorageChartContainer/>
            </Segment>
          </Grid.Column>
          {/* <Grid.Column computer={8} largeScreen={4} widescreen={4}>
            <Segment>
              <Header icon='clock' content='Latest Events'/>
              <p>Latest events involving the system.</p>
              <LatestEventsFeedContainer/>
            </Segment>
          </Grid.Column> */}
          <Grid.Column width={16}>
            <Segment>
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
