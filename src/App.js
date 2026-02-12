import { Suspense, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./components/Loading";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { registerLoadingSetter } from "./api/loadingBridge";

function GlobalLoader() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    registerLoadingSetter(setLoading);
  }, [setLoading]);

  return loading ? <Loading /> : null;
}

function App() {
  return (
    <LoadingProvider>
      <GlobalLoader />

      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </LoadingProvider>
  );
}

export default App;
