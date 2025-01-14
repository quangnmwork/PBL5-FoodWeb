import OverallLayout from './pages/control/OverallLayout';
import { SWRConfig } from 'swr';
import axiosClient from './api/repository';
function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (resource: string) =>
          axiosClient.get(resource).then((res) => res.data)
      }}
    >
      <OverallLayout />
    </SWRConfig>
  );
}

export default App;
