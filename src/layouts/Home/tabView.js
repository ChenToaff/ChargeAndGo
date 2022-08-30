import StationTab from "./stationTab";

export default function TabView({
  stations,
  setSelectedStation,
  selectedStation,
}) {
  {
    return (
      <div style={{ overflowY: "scroll", height: "100%" }}>
        {stations.map((station) => (
          <StationTab
            key={station._id}
            station={station}
            setSelectedStation={setSelectedStation}
            selectedStation={selectedStation}
          />
        ))}
      </div>
    );
  }
}
