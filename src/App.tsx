import { AircraftList } from './components/AircraftList/AircraftList';
import { FlightList } from './components/FlightList/FlightList';
import { Aircraft } from './models/aircraft';
import { Flight } from './models/flight';

function App() {
  const aircrafts = [
    new Aircraft('AS1001', 'A320', 120, 'CPV'),
    new Aircraft('AS1002', 'A380', 320, 'JPA'),
  ];

  const flights = [
    new Flight('AS1001', 21500, 26100, '6:00', '7:15', 'LFSB', 'LFMN'),
    new Flight('AS1002', 27900, 32100, '7:45', '08:55', 'LFMN', 'LFSB'),
    new Flight('AS1025', 22800, 28000, '06:20', '07:50', 'LFSB', 'EDDH'),
    new Flight('AS1026', 30000, 35100, '08:20', '09:45', 'EDDH', 'LFSB'),
  ];

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-dark-purple">
      <h1 className="text-4xl font-bold text-linen text-center ">
        Hello World
      </h1>
      <AircraftList aircrafts={aircrafts} />
      <FlightList flights={flights} />
    </div>
  );
}

export default App;
