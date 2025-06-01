import React, { useEffect, useState } from "react";
import { Card, Icon, Segment, Header, Grid } from "semantic-ui-react";

const LATITUDE = 27.30; // Ravangla latitude
const LONGITUDE = 88.36; // Ravangla longitude

function useEnvironmentalForecast() {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch irradiation, temperature, and humidity for yesterday, today, tomorrow
        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=shortwave_radiation_sum,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min&timezone=Asia/Kolkata&past_days=1`;
        const meteoRes = await fetch(meteoUrl);
        const meteoData = await meteoRes.json();

        if (
          !meteoData.daily ||
          !meteoData.daily.shortwave_radiation_sum ||
          meteoData.daily.shortwave_radiation_sum.length < 3
        ) {
          setError("No forecast data found.");
          setForecast([]);
          return;
        }

        // Convert MJ/m² to kWh/m²
        const irradiationArr = meteoData.daily.shortwave_radiation_sum.map(val =>
          (val / 3.6).toFixed(1)
        );
        // Average temperature and humidity for each day
        const tempArr = meteoData.daily.temperature_2m_max.map((max, i) =>
          ((max + meteoData.daily.temperature_2m_min[i]) / 2).toFixed(1)
        );
        const humidityArr = meteoData.daily.relative_humidity_2m_max.map((max, i) =>
          ((max + meteoData.daily.relative_humidity_2m_min[i]) / 2).toFixed(0)
        );

        // Use only yesterday, today, tomorrow
        const result = [0, 1, 2].map(idx => ({
          label: idx === 0 ? "Yesterday" : idx === 1 ? "Today" : "Tomorrow",
          irradiation: irradiationArr[idx],
          temperature: tempArr[idx],
          humidity: humidityArr[idx],
          expectedGeneration: (irradiationArr[idx] * 3.7).toFixed(1)
        }));

        setForecast(result);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch forecast data.");
        setForecast([]);
      }
    }

    fetchData();
  }, []);

  return { forecast, error };
}

const EnvironmentalPrediction = () => {
  const { forecast, error } = useEnvironmentalForecast();

  return (
    <Grid.Column width={16}>
      <Segment>
        <Header icon="cloud sun" content="Environmental Prediction" />
        {error ? (
          <div style={{ color: "red", padding: "1em" }}>
            Error fetching data: {error}
          </div>
        ) : (
          <Card.Group itemsPerRow={3} stackable>
            {forecast.map((day) => (
              <Card key={day.label}>
                <Card.Content>
                  <Card.Header>{day.label}</Card.Header>
                  <Card.Meta>
                    <span>
                      <Icon name="sun" /> Irradiation: <b>{day.irradiation} kWh/m²</b>
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    <div>
                      <Icon name="thermometer half" /> Temperature: <b>{day.temperature}°C</b>
                    </div>
                    <div>
                      <Icon name="tint" /> Humidity: <b>{day.humidity}%</b>
                    </div>
                    <div style={{ marginTop: "0.5em" }}>
                      Expected Generation:{" "}
                      <span style={{ color: "#21ba45", fontWeight: "bold" }}>
                        {day.expectedGeneration} kWh
                      </span>
                    </div>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        )}
        <div style={{ marginTop: "1em", color: "#888", fontSize: "0.95em" }}>
          Prediction based on Open-Meteo Satellite Radiation API.
        </div>
      </Segment>
    </Grid.Column>
  );
};

export default EnvironmentalPrediction;
