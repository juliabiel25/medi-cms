import About from '../components/About';
import AppointmentForm from '../components/AppointmentForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Map from '../components/Map';
import News from '../components/News';
import Spinner from '../components/Spinner';
import Team from '../components/Team';

const DoctorsPage = () => {
  return (
    <div id="doctors-page">
      <Spinner />
      <Header />
      <Home />
      <About />
      <Map />
      <Footer />
    </div>
  )
}

export default DoctorsPage