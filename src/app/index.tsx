import { MainPage } from '@/src/pages/main';
import { WithProviders } from '@/src/app/providers';

function App() {
  return (
    <WithProviders>
      <MainPage />
    </WithProviders>
  );
}

export default App;
