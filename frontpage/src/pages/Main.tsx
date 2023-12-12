import About from '../components/About';
import AppointmentForm from '../components/AppointmentForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Map from '../components/Map';
import News from '../components/News';
import Spinner from '../components/Spinner';
import Team from '../components/Team';

const Main = () => {
  return(
    <div id="main-page">
      <Spinner />
      <Header />
      <Home />
      <About />
      <Team />
      <News />
      <AppointmentForm />
      <Map />
      <Footer />
    </div>
  )
}

export default Main