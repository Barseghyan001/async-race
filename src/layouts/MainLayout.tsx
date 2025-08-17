import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.tsx';

const MainLayout = () => {
  return (
    <section className="container">
      <Header />
      <Outlet />
    </section>
  );
};

export default MainLayout;
