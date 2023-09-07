import { Outlet, useLocation} from 'react-router-dom';
import Header from '../components/Header/Header';

function RootLayout() {
  const { pathname } = useLocation();
  let backButtonPath;
  if (pathname !== "/") {
    if(pathname.includes("/chat/")) {
       backButtonPath= "/chat"
    } 
    else if (pathname.includes("/game")) {
      backButtonPath= "/chat/"
    }
    else { backButtonPath= "/" } 
  }
  return (
    <>
      <Header backButtonPath={backButtonPath} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
