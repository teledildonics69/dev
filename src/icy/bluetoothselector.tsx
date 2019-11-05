import React, { useState, FC, CSSProperties } from "react";

const baseStyles: CSSProperties = {
  boxSizing: "border-box",
  border: "1px solid black",
  color: "#000",
  background: "#DDE",
  height: "42px",
  width: "128px",
  fontSize: "14px",
  fontFamily: "sans-serif",
  padding: "0px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "default"
};

export const BluetoothSelector: FC<{
  onChange: (event: { target: { value: BluetoothDevice } }) => void;
  options: RequestDeviceOptions;
  style?: CSSProperties;
}> = ({ onChange, options = { acceptAllDevices: true }, style = {} }) => {
  const [device, setDevice] = useState<BluetoothDevice>();
  const [requested, setRequested] = useState<Promise<BluetoothDevice>>();

  if (!requested) {
    return (
      <button
        style={{ ...baseStyles, cursor: "pointer", ...style }}
        onClick={async () => {
          const request = navigator.bluetooth.requestDevice(options);
          setRequested(request);

          try {
            const device = await request;
            setDevice(device);
            onChange({ target: { value: device } });
          } catch (error) {
            console.error(error);
            setRequested(undefined);
          }
        }}
      >
        Select ᛒᚼ Device
      </button>
    );
  } else if (!device) {
    return (
      <button
        disabled={true}
        style={{ ...baseStyles, background: "#AAB", color: "#444", ...style }}
      >
        Selecting ᛒᚼ...
      </button>
    );
  } else {
    return (
      <span style={{ ...baseStyles, background: "#8CA", ...style }}>ᛒᚼ {device.name}</span>
    );
  }
};

export default BluetoothSelector;