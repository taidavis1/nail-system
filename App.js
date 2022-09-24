import Main from './src';
import { useLoadDataAndSplash } from './src/hook/loadDataAndSplash';


export default function App() {

  const isLoading = useLoadDataAndSplash()

  if (!isLoading) return null
  return (
      <Main/>
  );
}


