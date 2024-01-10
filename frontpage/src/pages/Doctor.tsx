import About from '../components/About';
import AppointmentForm from '../components/AppointmentForm';
import DoctorDetail from '../components/DoctorDetail';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../components/Home';
import Map from '../components/Map';
import News from '../components/News';
import Spinner from '../components/Spinner';
import Team from '../components/Team';
import * as React from 'react';

const DoctorPage = () => {
  return (
    <div id="doctor-page">
      <Spinner />
      <Header />
      <DoctorDetail />
      <Map />
      <Footer />
    </div>
  )
}

export default DoctorPage