require('dotenv').config();
const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL);

const sensorIds = ['temp_1', 'humid_2', 'temp_3', 'humid_4'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}

client.on('connect', () => {
  console.log('Sensor Emulator connected to MQTT');

  setInterval(() => {
    const timestamp = Math.floor(Date.now() / 1000);

    sensorIds.forEach((sensorId) => {
      const payload = {
        sensor_id: sensorId,
        timestamp,
        temperature: randomInt(15, 35),
        humidity: randomFloat(40, 90),
      };

      client.publish('sensor/data', JSON.stringify(payload));
      console.log(`[${new Date().toISOString()}] Sent from ${sensorId}:`, payload);
    });
  }, 10000); // 30 saniyede bir
});
