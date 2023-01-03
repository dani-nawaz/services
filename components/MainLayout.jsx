import Navbar from '../components/navbar/Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {

  return (
    <div className="bg-gray-50">
      <Navbar/>
      {children}
      <Footer/>

    </div>
  );
}
