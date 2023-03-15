import { AircraftList } from './components/AircraftList/AircraftList';
import { Aircraft } from './models/aircraft';

function App() {
  const aircrafts = [
    new Aircraft('AS1001', 'A320', 120, 'CPV'),
    new Aircraft('AS1002', 'A380', 320, 'JPA'),
  ];

  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-dark-purple">
      <h1 className="text-4xl font-bold text-linen text-center ">
        Hello World
      </h1>
      <AircraftList aircrafts={aircrafts} />
    </div>
  );
}

export default App;
