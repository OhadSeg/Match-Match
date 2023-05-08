import { Outlet, useLocation} from 'react-router-dom';
import Header from '../components/Header/Header';

function RootLayout() {
  const { pathname } = useLocation();
  let backButtonPath;
  if (pathname !== "/") {
    backButtonPath = pathname.includes("/chat/") ? "/chat" : "/";
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
