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
import PanelStatusTable from "../../components/PanelStatusTable/PanelStatusTable";
//import LatestEventsFeedContainer from "../../containers/LatestEventsFeedContainer";
import EnvironmentalPrediction from "../../components/EnvironmentalPrediction";

import PanelStatusTableContainer from "../../containers/PanelStatusTableContainer";
import './OverviewPageContent.css';

class OverviewPageContent extends Component {
  render() {
    return (
      <Container>
        <Header as='h1' content='Overview' />
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
    <PanelStatusTable />
  </Segment>
</Grid.Column>
          {/* Environmental Prediction Column */}
          <Grid.Column width={16}>
            <EnvironmentalPrediction />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default OverviewPageContent;
