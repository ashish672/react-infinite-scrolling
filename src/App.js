import logo from './logo.svg';
import './App.css';
import {QueryClient , QueryClientProvider} from "react-query"
import Photos from "./Photos"
const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <Photos/>
        </QueryClientProvider>
    </div>
  );
}

export default App;
