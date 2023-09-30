class AntennaRotator {
    constructor(CallSign, Radio, Rotator) {
      this.CallSign = CallSign;
      this.Radio = Radio;
      this.Rotator = Rotator;
    }
  
    // Method to set the antenna rotator mode
    setMode(mode) {
      this.Rotator.Mode = mode;
    }
  
    // Method to toggle auto tracking mode
    toggleAutoTracking() {
      this.Rotator.isAutoTracking = !this.Rotator.isAutoTracking;
    }
  
    // Method to toggle manual tracking mode
    toggleManualTracking() {
      this.Rotator.isManualTracking = !this.Rotator.isManualTracking;
    }
  
    // Method to update heading
    setHeading(heading) {
      this.Rotator.Heading = heading;
    }
  
    // Method to set the antenna offset
    setOffset(azimuthOffset, elevationOffset) {
      this.Rotator.aOffset = azimuthOffset;
      this.Rotator.yOffset = elevationOffset;
    }
  
    // Method to update the antenna position
    setPosition(azimuth, elevation) {
      this.Rotator.Position = { azimuth, elevation };
    }
  
    // Method to update the antenna location
    setLocation(latitude, longitude) {
      this.Rotator.Location = { Latitude: latitude, Longitude: longitude };
    }
  
    // Method to mark the antenna as ready
    markAsReady() {
      this.Rotator.isReady = true;
    }
  
    // Method to mark the antenna as not ready
    markAsNotReady() {
      this.Rotator.isReady = false;
    }
  }
  
  // Example usage:
  const antenna = new AntennaRotator(
    "MyAntenna",
    { Signal: 100, AOS: "Satellite AOS", LOS: "Satellite LOS", Uplink: "Uplink Frequency", Downlink: "Downlink Frequency" },
    { Mode: "Auto", isAutoTracking: true, isManualTracking: false, Heading: "N", aOffset: 0, yOffset: 0, Position: { azimuth: 0, elevation: 0 }, Location: { Latitude: 0, Longitude: 0 }, isReady: true }
  );
  
  console.log(antenna);
  antenna.setMode("Manual");
  antenna.toggleAutoTracking();
  antenna.setOffset(10, 20);
  antenna.setPosition(45, 30);
  antenna.setLocation(40.7128, -74.0060);
  antenna.markAsNotReady();
  console.log(antenna);
  