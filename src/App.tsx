import { QueryClient, QueryClientProvider } from 'react-query'
import { FlightRotation } from './pages/FlightRotation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FlightRotation />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
