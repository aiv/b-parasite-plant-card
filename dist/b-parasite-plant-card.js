import {
  LitElement,
  nothing,
  html,
  css,
} from 'https://unpkg.com/lit-element@4.2.0/lit-element.js?module';
import { join } from 'https://unpkg.com/lit-html@3.3.0/directives/join.js?module';
import { map } from 'https://unpkg.com/lit-html@3.3.0/directives/map.js?module';

const CUSTOM_CARD_NAME = 'b-paraiste-plant-card';

const DecimalsState = {
  UNTOUCHED: 'untouched',
  ZERO: '0',
  ONE: '1',
};

const DeviceClass = {
  BATTERY: 'battery',
  ILLUMINANCE: 'illuminance',
  HUMIDITY: 'humidity',
  MOISTURE: 'moisture',
  TEMPERATURE: 'temperature',
};

const DisplayMode = {
  FULL: 'full',
  COMPACT: 'compact',
};

const EntityType = {
  SENSOR: 'sensor',
};

const MeasurementStatusStates = {
  NO_DATA: 'no_data',
  TOO_LOW: 'too_low',
  LOW: 'low',
  PERFECT: 'perfect',
  HIGH: 'high',
  TOO_HIGH: 'too_high',
};

const MeasurementStatusColors = {
  [MeasurementStatusStates.NO_DATA]: 'var(--disabled-text-color, #bdbdbd)',
  [MeasurementStatusStates.TOO_LOW]: 'var(--red-color, #f44336)',
  [MeasurementStatusStates.LOW]: 'var(--orange-color, #ff9800)',
  [MeasurementStatusStates.PERFECT]: 'var(--green-color, #4caf50)',
  [MeasurementStatusStates.HIGH]: 'var(--orange-color, #ff9800)',
  [MeasurementStatusStates.TOO_HIGH]: 'var(--red-color, #f44336)',
};

const PreferredPlantImage = {
  USER: 'user',
  DEFAULT: 'default',
};

const SensorTypes = {
  BATTERY: 'battery',
  ILLUMINANCE: 'illuminance',
  MOISTURE: 'moisture',
  HUMIDITY: 'humidity',
  TEMPERATURE: 'temperature',
};

const DEFAULT_CONFIG = {
  battery_threshold: 30,
  decimals: DecimalsState.UNTOUCHED,
  device_id: '',
  display_mode: DisplayMode.FULL,
  sensors: [
    { type: SensorTypes.ILLUMINANCE, isEnabled: true },
    { type: SensorTypes.MOISTURE, isEnabled: true },
    { type: SensorTypes.TEMPERATURE, isEnabled: true },
    { type: SensorTypes.HUMIDITY, isEnabled: true },
  ],
  preferred_image: PreferredPlantImage.DEFAULT,
  show_scientific_name: true,
  state_color_battery: true,
  state_color_icon: true,
  state_color_sensor: true,
  state_battery: true,
  title: '',
  scientific_name: '',
  custom_image: '',
  moisture_too_low_max: 10,
  moisture_low_max: 30,
  moisture_perfect_max: 70,
  moisture_high_max: 90,
  illuminance_too_low_max: 5,
  illuminance_low_max: 10,
  illuminance_perfect_max: 70,
  illuminance_high_max: 90,
  temperature_too_low_max: 5,
  temperature_low_max: 10,
  temperature_perfect_max: 30,
  temperature_high_max: 40,
  humidity_too_low_max: 20,
  humidity_low_max: 30,
  humidity_perfect_max: 70,
  humidity_high_max: 90,
};

const SCHEMA_PART_ONE = [
  {
    name: 'header_device',
    type: 'constant',
    label: 'Plant',
  },
  {
    name: 'device_id',
    label: 'Device (Required)',
    required: true,
    selector: {
      device: {
        integration: 'bthome',
        manufacturer: 'b-parasite',
      },
    },
  },
  {
    name: 'title',
    label: 'Title',
    selector: {
      text: {},
    },
  },
  {
    name: 'scientific_name',
    label: 'Scientific Name',
    selector: {
      text: {},
    },
  },  
  {
    name: 'header_measurements',
    type: 'constant',
    label: 'Sensor Measurements',
  },
  {
    name: 'battery_threshold',
    label: 'Battery Threshold (%)',
    selector: {
      number: {
        min: 0,
        max: 100,
        step: 5,
        mode: 'slider',
      },
    },
    default: DEFAULT_CONFIG.battery_threshold,
  },
];

const SCHEMA_PART_TWO = [
  {
    name: 'header_moisture',
    type: 'constant',
    label: 'Moisture Sensor Settings',
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'moisture_too_low_max',
        label: 'Too Low Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.moisture_too_low_max,
      },
      {
        name: 'moisture_low_max',
        label: 'Low Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.moisture_low_max,
      },
      {
        name: 'moisture_perfect_max',
        label: 'Perfect Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.moisture_perfect_max,
      },
      {
        name: 'moisture_high_max',
        label: 'High Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.moisture_high_max,
      },
    ],
  },
  {
    name: 'header_illuminance',
    type: 'constant',
    label: 'Illuminance Sensor Settings',
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'illuminance_too_low_max',
        label: 'Too Low Max (lx)',
        selector: {
          number: {
            min: 0,
            max: 10000,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.illuminance_too_low_max,
      },
      {
        name: 'illuminance_low_max',
        label: 'Low Max (lx)',
        selector: {
          number: {
            min: 0,
            max: 10000,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.illuminance_low_max,
      },
      {
        name: 'illuminance_perfect_max',
        label: 'Perfect Max (lx)',
        selector: {
          number: {
            min: 0,
            max: 10000,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.illuminance_perfect_max,
      },
      {
        name: 'illuminance_high_max',
        label: 'High Max (lx)',
        selector: {
          number: {
            min: 0,
            max: 10000,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.illuminance_high_max,
      },
    ],
  },
  {
    name: 'header_temperature',
    type: 'constant',
    label: 'Temperature Sensor Settings',
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'temperature_too_low_max',
        label: 'Too Low Max (°C)',
        selector: {
          number: {
            min: -20,
            max: 60,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.temperature_too_low_max,
      },
      {
        name: 'temperature_low_max',
        label: 'Low Max (°C)',
        selector: {
          number: {
            min: -20,
            max: 60,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.temperature_low_max,
      },
      {
        name: 'temperature_perfect_max',
        label: 'Perfect Max (°C)',
        selector: {
          number: {
            min: -20,
            max: 60,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.temperature_perfect_max,
      },
      {
        name: 'temperature_high_max',
        label: 'High Max (°C)',
        selector: {
          number: {
            min: -20,
            max: 60,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.temperature_high_max,
      },
    ],
  },
  {
    name: 'header_humidity',
    type: 'constant',
    label: 'Humidity Sensor Settings',
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'humidity_too_low_max',
        label: 'Too Low Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.humidity_too_low_max,
      },
      {
        name: 'humidity_low_max',
        label: 'Low Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.humidity_low_max,
      },
      {
        name: 'humidity_perfect_max',
        label: 'Perfect Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.humidity_perfect_max,
      },
      {
        name: 'humidity_high_max',
        label: 'High Max (%)',
        selector: {
          number: {
            min: 0,
            max: 100,
            step: 1,
            mode: 'box',
          },
        },
        default: DEFAULT_CONFIG.humidity_high_max,
      },
    ],
  },
  {
    name: 'header_layout',
    type: 'constant',
    label: 'Layout',
  },
  {
    name: 'display_mode',
    label: 'Display Mode',
    selector: {
      select: {
        options: [
          { label: 'Full', value: DisplayMode.FULL },
          { label: 'Compact', value: DisplayMode.COMPACT },
        ],
        mode: 'box',
      },
    },
    default: DEFAULT_CONFIG.display_mode,
  },
  {
    name: 'preferred_image',
    label: 'Preferred plant image',
    selector: {
      select: {
        options: [
          { label: 'User Image', value: PreferredPlantImage.USER },
          { label: 'Default Image', value: PreferredPlantImage.DEFAULT },
        ],
        mode: 'box',
      },
    },
    default: DEFAULT_CONFIG.preferred_image,
  },
  {
    name: 'custom_image',
    label: 'Custom plant image URL',
    selector: {
      text: {},
    },
    default: DEFAULT_CONFIG.custom_image,
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'show_scientific_name',
        label: 'Show scientific name',
        type: 'boolean',
        selector: { boolean: {} },
        default: DEFAULT_CONFIG.show_scientific_name,
      },
      {
        name: 'state_color_battery',
        label: 'Show battery state color',
        selector: { boolean: {} },
        default: DEFAULT_CONFIG.state_color_battery,
      },
    ],
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'state_color_sensor',
        label: 'Show sensor state color',
        selector: { boolean: {} },
        default: DEFAULT_CONFIG.state_color_sensor,
      },
      {
        name: 'state_color_icon',
        label: 'Show colored state icons ',
        selector: { boolean: {} },
        default: DEFAULT_CONFIG.state_color_icon,
      },
      {
        name: 'state_battery',
        label: 'Show battery state',
        selector: { boolean: {} },
        default: DEFAULT_CONFIG.state_battery,
      },
    ],
  },
  {
    name: 'decimals',
    label: 'Sensor reading decimals',
    selector: {
      select: {
        mode: 'dropdown',
        options: [
          { label: 'Unchanged', value: DecimalsState.UNTOUCHED },
          { label: '0', value: DecimalsState.ZERO },
          { label: '1', value: DecimalsState.ONE },
        ],
      },
    },
    default: DEFAULT_CONFIG.decimals,
  },
];

const SENSOR_SETTINGS = {
  [SensorTypes.BATTERY]: {
    min: 0,
    max: 100,
    icon: 'mdi:battery',
    name: 'Battery',
  },
  [SensorTypes.ILLUMINANCE]: {
    min: 0,
    max: 10000,
    icon: 'mdi:white-balance-sunny',
    name: 'Illuminance',
  },
  [SensorTypes.MOISTURE]: {
    min: 0,
    max: 100,
    icon: 'mdi:water-percent',
    name: 'Moisture',
  },
  [SensorTypes.TEMPERATURE]: {
    min: 0,
    max: 50,
    icon: 'mdi:thermometer',
    name: 'Temperature',
  },
  [SensorTypes.HUMIDITY]: {
    min: 0,
    max: 100,    
    icon: 'mdi:water',
    name: 'Humidity',
  },
};

const parseConfig = (config) => {
  return { ...DEFAULT_CONFIG, ...config };
};

class BParasitePlantCard extends LitElement {
  static getConfigElement() {
    return document.createElement(`${CUSTOM_CARD_NAME}-editor`);
  }

  static getStubConfig() {
    return DEFAULT_CONFIG;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this._measurementEntityIds = {
      [SensorTypes.BATTERY]: '',
      [SensorTypes.ILLUMINANCE]: '',
      [SensorTypes.MOISTURE]: '',
      [SensorTypes.TEMPERATURE]: '',
      [SensorTypes.HUMIDITY]: '',
    };
  }

  _calculateSize(gridSize) {
    // Calculate card size dependent on display mode and number of sensors shown
    const baseHeight = this.config?.display_mode === DisplayMode.FULL ? 130 : 90; // Base size

    // Count enabled sensors and add 0.5 to base size for each sensor beyond the first 2
    const sensorCount = this.config.sensors?.reduce((accumulator, item) => accumulator + (item?.isEnabled ? 1 : 0), 0);
    const attributesHeight = Math.ceil(sensorCount / 2) * 30;

    const cardHeight = baseHeight + attributesHeight;

    return Math.ceil(cardHeight / gridSize * 2) / 2;
  }

  getCardSize() {
    return this._calculateCardSize(50);
  }

  getLayoutOptions() {
    const gridRows = this._calculateSize(56);

    return {
      grid_rows: gridRows,
      grid_columns: 4,
      grid_min_rows: 3,
      grid_min_columns: 2,
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    this.config = parseConfig(config);
  }

  _click(entityId) {
    if (!entityId) return;
    const event = new Event(('hass-more-info'), {
      bubbles: true,
      cancelable: false,
      composed: true,
    });
    event.detail = { entityId };
    this.dispatchEvent(event);
    return event;
  }

  // Format unit for card display (only show part before "/" if it exists)
  _formatDisplayUnit(unit) {
    if (!unit) return '';
    const parts = unit.split('/');
    return parts[0];
  }

  _formatDecimals(value, decimals = 0) {
    const numberValue = Number(value);
    return isNaN(numberValue) ? '' : numberValue.toFixed(decimals);
  }

  _formatSensorValue(sensorEntity, configDecimals) {
    const sensorValue = sensorEntity.state;
    if (configDecimals !== DecimalsState.UNTOUCHED) {
      return this._formatDecimals(sensorValue, parseInt(configDecimals));
    }

    const entityPrecision = sensorEntity.display_precision;
    return isNaN(entityPrecision) ? sensorValue : this._formatDecimals(sensorValue, entityPrecision);
  }

  _getPlantImageSrc() {
    if (this.config.preferred_image === PreferredPlantImage.USER && this.config.custom_image && this.config.custom_image.trim() !== '') {
      return '/local/plants/' + this.config.custom_image.trim();
    } else {
      return new URL('./assets/flower-outline.png', import.meta.url);
    }
  };

  _handleEntity(id, hass) {
    const hassState = hass.states[id];
    if (!hassState) return;

    const hassEntity = hass.entities[id];
    if (!hassEntity) return;

    if (id.startsWith(EntityType.SENSOR)) {
      switch (hassState.attributes.device_class) {
        case DeviceClass.BATTERY:
        case DeviceClass.ILLUMINANCE:
        case DeviceClass.HUMIDITY:
        case DeviceClass.MOISTURE:
        case DeviceClass.TEMPERATURE: {
          this._measurementEntityIds[hassState.attributes.device_class] = hassState.entity_id;
          return;
        }
      }
    }
  }

  _handleEntities(hass, deviceId) {
    Object.keys(hass.entities)
      .filter((id) => hass.entities[id].device_id === deviceId)
      .forEach((id) => this._handleEntity(id, hass), this);
  }

  static get styles() {
    return css`
      ha-card {
        position: relative;
        padding: 0;
        background-size: 100%;
        margin-top: 25px;
      }

      img {
        display: block;
        height: auto;
        transition: filter .2s linear;
        width: 100%;
      }

      .header {
        padding-top: 8px;
        height: 72px;
        position: relative;
        display: flex;
      }

      .header #plant-image {
        width: 90px;
        margin: -28px 16px 0px;
      }

      .header #plant-image > img {
        background: white;
        border-radius: 50%;
        width: 90px;
        height: 90px;
        object-fit: cover;
        box-shadow: var( --ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2) );
      }

      .header #plant-image > img.state {
        width: 86px;
        height: 86px;
        border-color: var(--disabled-text-color, #bdbdbd);
        border-width: 2px;
        border-style: solid;
      }

      .header #plant-text {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-right: 12px;
        height: 44px;
        justify-content: center;
        overflow: hidden;
      }

      .header #plant-text > #name {
        font-weight: bold;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .header #plant-text > #scientific-name {
        color: var(--secondary-text-color, #727272);
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .header #plant-battery {
        margin-top: 18px;
        margin-right: 16px;
        cursor: pointer;
      }

      .attributes {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 16px 16px 8px;
        white-space: nowrap;
      }

      .attribute {
        white-space: nowrap;
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 8px;
        cursor: pointer;
      }

      .attribute ha-icon {
        margin-right: 8px;
        flex-shrink: 0;
        width: 24px;
        text-align: center;
      }

      .sensor-value {
        flex-shrink: 0;
        margin-right: 4px;
        text-align: right;
        min-width: 40px;
      }

      .meter {
        height: 8px;
        background-color: var(--primary-background-color, #fafafa);
        border-radius: 2px;
        margin-right: 8px;
        display: inline-grid;
        overflow: hidden;
        flex-grow: 1;
        max-width: none;
      }

      .meter > span {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
        background-color: var(--primary-text-color, #212121);
      }

      .meter > .good {
        background-color: var(--green-color, #4caf50);
      }

      .meter > .bad {
        background-color: var(--red-color, #f44336);
      }

      .meter > .warning {
        background-color: var(--orange-color, #ff9800);
      }

      .meter > .unavailable {
        background-color: var(--grey-color, #9e9e9e);
      }

      .divider {
        height: 1px;
        background-color: var(--secondary-text-color, #727272);
        opacity: 0.25;
        margin-left: 8px;
        margin-right: 8px;
      }

      .tooltip {
        position: relative;
      }

      .tooltip .tip {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        padding: 6px 10px;
        top: 3.3em;
        left: 50%;
        -webkit-transform: translateX(-50%) translateY(-180%);
        transform: translateX(-50%) translateY(-180%);
        background-color: var(--grey-color, #9e9e9e);
        color: var(--white-color, #ffffff);
        white-space: nowrap;
        z-index: 2;
        border-radius: 2px;
        transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
      }

      .battery.tooltip .tip {
        top: 2em;
      }

      .tooltip:hover .tip, .tooltip:active .tip {
        display: block;
        opacity: 1;
        visibility: visible;
        -webkit-transform: translateX(-50%) translateY(-200%);
        transform: translateX(-50%) translateY(-200%);
      }

      .uom {
        color: var(--secondary-text-color, #727272);
        font-size: 0.9em;
        flex-shrink: 0;
        text-align: left;
        width: 30px;
        margin-right: 4px;
      }

      .sensor-row {
      }

      .sensor-column {
        width: 50%;
        box-sizing: border-box;
      }

      .sensor-column-left {
        padding-right: 12px;      
      }

      .compact-mode .attribute {
        padding-bottom: 4px;
      }

      .compact-mode .meter {
        max-width: none;
      }

      .compact-mode .sensor-value,
      .compact-mode .uom {
        display: none;
      }

      .compact-mode #plant-text {
        margin-top: 8px;
      }

      /* We'll use the same header style as normal mode, but with reduced padding */
      .compact-mode .header {
        padding-top: 6px;
        height: 64px;
      }

      .compact-mode .header #plant-image {
        width: 78px;
        margin: -24px 16px 0px;
      }

      .compact-mode .header #plant-image > img {
        width: 78px;
        height: 78px;
      }

      .compact-mode .header #plant-image > img.state {
        width: 74px;
        height: 74px;
        border-color: var(--disabled-text-color, #bdbdbd);
        border-width: 2px;
        border-style: solid;
      }

      .compact-mode #plant-battery {
        margin-top: 16px;
      }

      /* Reduce padding in the attributes section for compact mode */
      .compact-mode .attributes {
        padding: 4px 16px 0px;
      }
    `;
  }

  render() {
    if (!this.hass || !this.config) {
      console.debug('hass or config not set.');
      return nothing;
    }

    // If no device is specified, show a configuration prompt
    if (!this.config.device_id) {
      return html`
        <ha-card>
          <hui-warning>
            Please select a b-parasite device in the card configuration.
          </hui-warning>
        </ha-card>
      `;
    }

    const deviceId = this.config.device_id;
    if (!deviceId) {
      console.debug('device_id not set.');
      return;
    }

    const device = this.hass.devices[deviceId];

    // Create a new config object with all defaults
    if (!this.config?.title || this.config.title === '') {
      const newConfig = {
        ...DEFAULT_CONFIG,
        ...this.config,
        device_id: deviceId || '',
        title: device.name,
      };

      this.config = newConfig;
    }

    this._handleEntities(this.hass, deviceId);

    return html`
      <ha-card>
        <div id="container" class="${this.config.display_mode === DisplayMode.COMPACT ? 'compact-mode' : ''}">
          <div class="header">
            <div id="plant-image">
              <img src="${this._getPlantImageSrc()}">
            </div>
            <div id="plant-text">
              <span id="name">${this.config.title}</span>
              ${this.config.show_scientific_name ? html`<span id="scientific-name">${this.config.scientific_name}</span>`: nothing}
            </div>
            ${this._renderBattery(this.hass)}
          </div>
          <div class="divider"></div>
          <div class="attributes">
            ${this._renderSensors(this.hass)}
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderBattery(hass) {
    const entityId = this._measurementEntityIds[SensorTypes.BATTERY];
    const batteryLevel = parseInt(hass.states[entityId].state);

    // Check against the user-configured threshold
    const threshold = this.config?.battery_threshold ?? DEFAULT_CONFIG.battery_threshold;

    if (!this.config.state_battery) {
      // Only show battery if level is at or below the threshold
      // Skip showing if threshold is 0 (never show)
      if (threshold === 0 || batteryLevel > threshold) {
        return '';
      }
    }

    const BatteryStatusText = {
      GOOD: 'Good',
      FULL: 'Full',
      MEDIUM: 'Medium',
      LOW: 'Low',
      VERY_LOW: 'Very Low',
      CRITICAL: 'Critical',
      UNKNOWN: 'Unknown',
    };

    const thresholdLevels = [
      { threshold: 91, icon: 'mdi:battery', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.FULL },
      { threshold: 81, icon: 'mdi:battery-90', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.GOOD },
      { threshold: 71, icon: 'mdi:battery-80', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.GOOD },
      { threshold: 61, icon: 'mdi:battery-70', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.GOOD },
      { threshold: 51, icon: 'mdi:battery-60', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.GOOD },
      { threshold: 41, icon: 'mdi:battery-50', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.MEDIUM },
      { threshold: 31, icon: 'mdi:battery-40', color: 'var(--state-sensor-battery-high-color, #4caf50)', statusText: BatteryStatusText.MEDIUM },
      { threshold: 21, icon: 'mdi:battery-30', color: 'var(--state-sensor-battery-medium-color, #ff9800)', statusText: BatteryStatusText.LOW },
      { threshold: 11, icon: 'mdi:battery-20', color: 'var(--state-sensor-battery-medium-color, #ff9800)', statusText: BatteryStatusText.LOW },
      { threshold: 6, icon: 'mdi:battery-10', color: 'var(--state-sensor-battery-low-color, #f44336)', statusText: BatteryStatusText.VERY_LOW },
      { threshold: 0, icon: 'mdi:battery-alert', color: 'var(--state-sensor-battery-low-color, #f44336)', statusText: BatteryStatusText.CRITICAL },
      { threshold: -Infinity, icon: 'mdi:battery-alert-variant-outline', color: 'var(--state-sensor-battery-low-color, #f44336)', statusText: BatteryStatusText.UNKNOWN },
    ];

    const { icon, color, statusText } = thresholdLevels.find(({ threshold }) => batteryLevel >= threshold) || { icon: 'mdi:battery-alert-variant-outline', color: 'var(--red-color, #f44336)', statusText: BatteryStatusText.UNKNOWN };

    return html`
      <div id="plant-battery">
        <div class="battery tooltip" @click="${this._click.bind(this, entityId)}">
          <div class="tip" style="text-align:center;">Battery: ${batteryLevel}%<br>Status: ${statusText}</div>
          <ha-icon icon="${icon}" style="${this.config.state_color_battery ? `color: ${color};` : ''}"></ha-icon>
        </div>
      </div>
    `;
  }

  _calculateMeterState(sensorSettings, sensorEntity, statusState) {
    const MeterClass = {
      BAD: 'bad',
      GOOD: 'good',
      UNAVAILABLE: 'unavailable',
      WARNING: 'warning',
    };

    const sensorValue = sensorEntity !== null ? sensorEntity.state : null;
    let percentage = null;
    if (sensorValue !== null && sensorSettings.min !== null && sensorSettings.max != null) {
      const calculatedPercentage = (sensorValue - sensorSettings.min) / (sensorSettings.max - sensorSettings.min) * 100;
      percentage = Math.max(0, Math.min(100, calculatedPercentage));
    }
    switch (statusState) {
      case MeasurementStatusStates.TOO_LOW: {
        return {
          percentage: percentage !== null ? percentage : 10,
          class: MeterClass.BAD,
        };
      }
      case MeasurementStatusStates.LOW: {
        return {
          percentage: percentage !== null ? percentage : 30,
          class: MeterClass.WARNING,
        };
      }
      case MeasurementStatusStates.PERFECT: {
        return {
          percentage: percentage !== null ? percentage : 50,
          class: MeterClass.GOOD,
        };
      }
      case MeasurementStatusStates.HIGH: {
        return {
          percentage: percentage !== null ? percentage : 70,
          class: MeterClass.WARNING,
        };
      }
      case MeasurementStatusStates.TOO_HIGH: {
        return {
          percentage: percentage !== null ? percentage : 90,
          class: MeterClass.BAD,
        };
      }
      default: {
        return { percentage: 0, class: MeterClass.UNAVAILABLE };
      }
    }
  }

  _renderSensors(hass) {
    // Filter enabled sensors based on entity ID availability
    const visibleSensors = this.config.sensors?.filter((sensorSettings) => {
      return sensorSettings && sensorSettings.isEnabled && this._measurementEntityIds[sensorSettings.type] !== '';
    });

    if (!visibleSensors || visibleSensors.length === 0) {
      return nothing;
    }

    // Distribute items into columns considering their total number
    const leftColumnItems = [];
    const rightColumnItems = [];
    let fullWidthSensor = null;

    // Even number of sensors - distribute evenly
    // Odd number of sensors - always make the last item full-width
    visibleSensors.forEach((sensorSetting, index) => {
      if (index % 2 === 0) {
        if (index === visibleSensors.length - 1) {
          // Store the sensor that should be displayed full-width
          fullWidthSensor = sensorSetting.type;
        } else {
          leftColumnItems.push(sensorSetting.type);
        }
      } else {
        rightColumnItems.push(sensorSetting.type);
      }
    });

    // Render a single sensor
    const renderSensor = (sensorType) => {
      const sensorSettings = SENSOR_SETTINGS[sensorType];
      const sensorEntityId = this._measurementEntityIds[sensorType];
      const sensorEntity = hass.states[sensorEntityId];
      const formattedSensorValue = this._formatSensorValue(sensorEntity, this.config.decimals);

      // Get proper units for display and tooltip
      const unitOfMeasurement = hass.states[sensorEntityId].attributes.unit_of_measurement || '';

      // Get the proper status entity
      let sensorStatus = '';

      switch (sensorType) {
        case SensorTypes.MOISTURE:
          sensorStatus = MeasurementStatusStates.NO_DATA;
          const moistureTooLowMax = this.config?.moisture_too_low_max ?? DEFAULT_CONFIG.moisture_too_low_max;
          const moistureLowMax = this.config?.moisture_low_max ?? DEFAULT_CONFIG.moisture_low_max;
          const moisturePerfectMax = this.config?.moisture_perfect_max ?? DEFAULT_CONFIG.moisture_perfect_max;
          const moistureHighMax = this.config?.moisture_high_max ?? DEFAULT_CONFIG.moisture_high_max;
          
          if (sensorEntity.state < moistureTooLowMax) {
            sensorStatus = MeasurementStatusStates.TOO_LOW;
          } else if (sensorEntity.state < moistureLowMax) {
            sensorStatus = MeasurementStatusStates.LOW;
          } else if (sensorEntity.state <= moisturePerfectMax) {
            sensorStatus = MeasurementStatusStates.PERFECT;
          } else if (sensorEntity.state <= moistureHighMax) {
            sensorStatus = MeasurementStatusStates.HIGH;
          } else {
            sensorStatus = MeasurementStatusStates.TOO_HIGH;
          }
          break;
        case SensorTypes.ILLUMINANCE:
          sensorStatus = MeasurementStatusStates.NO_DATA;
          const illuminanceTooLowMax = this.config?.illuminance_too_low_max ?? DEFAULT_CONFIG.illuminance_too_low_max;
          const illuminanceLowMax = this.config?.illuminance_low_max ?? DEFAULT_CONFIG.illuminance_low_max;
          const illuminancePerfectMax = this.config?.illuminance_perfect_max ?? DEFAULT_CONFIG.illuminance_perfect_max;
          const illuminanceHighMax = this.config?.illuminance_high_max ?? DEFAULT_CONFIG.illuminance_high_max;
          
          if (sensorEntity.state < illuminanceTooLowMax) {
            sensorStatus = MeasurementStatusStates.TOO_LOW;
          } else if (sensorEntity.state < illuminanceLowMax) {
            sensorStatus = MeasurementStatusStates.LOW;
          } else if (sensorEntity.state <= illuminancePerfectMax) {
            sensorStatus = MeasurementStatusStates.PERFECT;
          } else if (sensorEntity.state <= illuminanceHighMax) {
            sensorStatus = MeasurementStatusStates.HIGH;
          } else {
            sensorStatus = MeasurementStatusStates.TOO_HIGH;
          }
          break;
        case SensorTypes.TEMPERATURE:
          sensorStatus = MeasurementStatusStates.NO_DATA;
          const temperatureTooLowMax = this.config?.temperature_too_low_max ?? DEFAULT_CONFIG.temperature_too_low_max;
          const temperatureLowMax = this.config?.temperature_low_max ?? DEFAULT_CONFIG.temperature_low_max;
          const temperaturePerfectMax = this.config?.temperature_perfect_max ?? DEFAULT_CONFIG.temperature_perfect_max;
          const temperatureHighMax = this.config?.temperature_high_max ?? DEFAULT_CONFIG.temperature_high_max;
          
          if (sensorEntity.state < temperatureTooLowMax) {
            sensorStatus = MeasurementStatusStates.TOO_LOW;
          } else if (sensorEntity.state < temperatureLowMax) {
            sensorStatus = MeasurementStatusStates.LOW;
          } else if (sensorEntity.state <= temperaturePerfectMax) {
            sensorStatus = MeasurementStatusStates.PERFECT;
          } else if (sensorEntity.state <= temperatureHighMax) {
            sensorStatus = MeasurementStatusStates.HIGH;
          } else {
            sensorStatus = MeasurementStatusStates.TOO_HIGH;
          }
          break;
        case SensorTypes.HUMIDITY:
          sensorStatus = MeasurementStatusStates.NO_DATA;
          const humidityTooLowMax = this.config?.humidity_too_low_max ?? DEFAULT_CONFIG.humidity_too_low_max;
          const humidityLowMax = this.config?.humidity_low_max ?? DEFAULT_CONFIG.humidity_low_max;
          const humidityPerfectMax = this.config?.humidity_perfect_max ?? DEFAULT_CONFIG.humidity_perfect_max;
          const humidityHighMax = this.config?.humidity_high_max ?? DEFAULT_CONFIG.humidity_high_max;
          
          if (sensorEntity.state < humidityTooLowMax) {
            sensorStatus = MeasurementStatusStates.TOO_LOW;
          } else if (sensorEntity.state < humidityLowMax) {
            sensorStatus = MeasurementStatusStates.LOW;
          } else if (sensorEntity.state <= humidityPerfectMax) {
            sensorStatus = MeasurementStatusStates.PERFECT;
          } else if (sensorEntity.state <= humidityHighMax) {
            sensorStatus = MeasurementStatusStates.HIGH;
          } else {
            sensorStatus = MeasurementStatusStates.TOO_HIGH;
          }
          break;
        default:
          sensorStatus = MeasurementStatusStates.NO_DATA;
      }

      const color = MeasurementStatusColors[sensorStatus];

      // Calculate meter width and class based on status
      const meterState = this._calculateMeterState(sensorSettings, sensorEntity, sensorStatus);

      // Generate tooltip content with current value and status - use full unit
      const tooltipContent = html`${sensorSettings.name}: ${formattedSensorValue} ${unitOfMeasurement}${sensorStatus ? html`<br>Status: ${sensorStatus.replace(/_/g, ' ')}` : nothing}`;

      return html`
        <div class="attribute tooltip" @click="${this._click.bind(this, sensorEntityId)}" data-entity="${sensorEntityId}">
          <div class="tip" style="text-align:center;">${tooltipContent}</div>
          <ha-icon icon="${sensorSettings.icon}" style="${this.config.state_color_icon ? `color:${color};` : ''}"></ha-icon>
          <div class="meter">
            <span class="${this.config.state_color_sensor ? `${meterState.class}` : ''}" style="width: ${meterState.percentage}%;"></span>
          </div>
          <div class="sensor-value">${formattedSensorValue}</div>
          <div class="uom">${this._formatDisplayUnit(unitOfMeasurement)}</div>
        </div>
      `;
    };

    // Render sensors in two columns
    let sensorHtml = html`
      <div class="sensor-column sensor-column-left">
        ${join(
    map(leftColumnItems, (sensor) => renderSensor(sensor)),
    ''
  )}
      </div>
      <div class="sensor-column">
        ${join(
    map(rightColumnItems, (sensor) => renderSensor(sensor)),
    ''
  )}
      </div>
    `;

    // Add full-width item if needed
    if (fullWidthSensor) {
      return html`${sensorHtml}${renderSensor(fullWidthSensor)}`;
    }

    return sensorHtml;
  }
}

customElements.define(CUSTOM_CARD_NAME, BParasitePlantCard);

export class BParasitePlantCardEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { state: true },
  };

  get deviceId() {
    return this.config?.device_id || '';
  }

  _computeLabel(schema) {
    // The schema already has labels, but for grids we need this function
    // to ensure proper display of field names
    return schema.label || schema.name;
  }

  _configChanged(config) {
    console.debug('Config changed:', config);
    const event = new Event('config-changed', {
      bubbles: true,
      composed: true,
    });
    event.detail = { config };
    this.dispatchEvent(event);
  }

  _handleChange(event) {
    console.debug('Handle change:', JSON.stringify(event), event);
    const item = event.currentTarget.closest('.item');
    const sensorType = item.getAttribute('data-sensor-type');

    let config = { ...this.config };

    let configSensors = config.sensors || DEFAULT_CONFIG.sensors;
    // Update the config with the new value
    configSensors = configSensors.map((sensorSettings) => {
      if (sensorSettings.type === sensorType) {
        return { ...sensorSettings, isEnabled: event.target.checked };
      }
      return sensorSettings;
    });

    config.sensors = configSensors;

    this._configChanged(config);
  } 

  _itemMoved(event) {
    console.debug('Item moved:', JSON.stringify(event), event);
    event.stopPropagation();

    const { oldIndex, newIndex } = event.detail;

    const newItems = this.config.sensors.concat();
    newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);

    const config = { ...this.config, sensors: newItems };

    this._configChanged(config);
  }

  _valueChanged(event) {
    console.debug('Value changed:', JSON.stringify(event), event);
    if (!this.config || !this.hass) {
      return;
    }

    // Start with a fresh object with the old values
    const config = { ...this.config };

    if (event.detail?.value) {
      Object.keys(event.detail.value).forEach((key) => {
        config[key] = event.detail.value[key];
      });
    }

    this._configChanged(config);
  }

  _getSensorColor(sensorType, isEnabled) {
    if (!isEnabled) {
      return 'var(--disabled-color, #bdbdbd)';
    }

    switch (sensorType) {
      case SensorTypes.ILLUMINANCE: {
        return 'var(--yellow-color, #ffeb3b)';
      }
      case SensorTypes.MOISTURE: {
        return 'var(--blue-color, #2196f3)';
      }
      case SensorTypes.TEMPERATURE: {
        return 'var(--green-color, #4caf50)';
      }
      case SensorTypes.HUMIDITY: {
        return 'var(--purple-color, #9c27b0)';
      }
      default: {
        return 'var(--disabled-color: #bdbdbd;)';
      }
    }
  }

  render() {
    if (!this.hass || !this.config) {
      return nothing;
    }
    
    return html`
      <div class="card-config">
        <div class="side-by-side">
          <ha-form
            .hass=${this.hass}
            .data=${this.config}
            .schema=${SCHEMA_PART_ONE}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <ha-sortable
            handle-selector=".handle"
            @item-moved=${this._itemMoved}
          >
            <div class="sensors">
              ${this.config?.sensors.map(({type, isEnabled}) => html`
                <div class="item"  data-sensor-type="${type}">
                  <div class="handle">
                    <ha-icon icon="mdi:drag"></ha-svg-icon>
                  </div>
                  <div class="item-switch">
                    <ha-switch
                      .checked=${isEnabled}
                      @change=${this._handleChange}
                    ></ha-switch>
                  </div>
                  <div class="item-icon">
                    <ha-icon
                      icon="${SENSOR_SETTINGS[type].icon}"
                      style="color:${this._getSensorColor(type, isEnabled)}"></ha-svg-icon>
                  </div>
                  <div class="item-label">${SENSOR_SETTINGS[type].name}</div>
                </div>
              `
  )}
            </div>
          </ha-sortable>
          <ha-form
            .hass=${this.hass}
            .data=${this.config}
            .schema=${SCHEMA_PART_TWO}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._valueChanged}
          ></ha-form>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .item {
        display: flex;
        margin-top: 8px;
        align-items: center;
        padding: 8px;
      }
      .item .handle {
        padding-right: 16px;
        cursor: move;
        cursor: grab;
        padding-inline-start: initial;
        padding-inline-end: 8px;
        direction: var(--direction);
      }
      .item .handle > * {
        pointer-events: none;
      }
      .item .item-switch, .item .item-icon {
        padding-right: 16px;
      }
      .item .item-label {
        flex-grow: 1;
      }
      .sensors {
        margin-bottom: 12px;
      }
    `;
  }

  setConfig(config) {
    // Start with a fresh object with all defaults set
    const newConfig = parseConfig(config);

    if (newConfig.device_id !== '' && newConfig.title === '' && this.hass) {
      try {
        const device = this.hass.devices[newConfig.device_id];
        if (device && device.name) {
          newConfig.title = device.name;
        }
      } catch (error) {
        console.error('Error setting title from selected device:', error);
      }
    }

    this.config = newConfig;
  }
}

customElements.define(`${CUSTOM_CARD_NAME}-editor`, BParasitePlantCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CUSTOM_CARD_NAME,
  name: 'b-parasite Plant Card',
  preview: true,
  description: 'Custom card for your b-parasite plant data',
});
