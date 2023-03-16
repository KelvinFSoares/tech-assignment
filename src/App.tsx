import { QueryClient, QueryClientProvider } from 'react-query';
import { FlightRotation } from './pages/FlightRotation';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FlightRotation />
    </QueryClientProvider>
  );
}

export default App;
