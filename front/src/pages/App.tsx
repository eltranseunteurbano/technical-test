import { QueryClient, QueryClientProvider } from 'react-query';

import Main from './Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: import.meta.env.PROD,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
