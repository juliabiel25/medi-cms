import Footer from '../components/Footer';
import Header from '../components/Header';
import Map from '../components/Map';
import Spinner from '../components/Spinner';
import TeamHorizontal from '../components/TeamHorizontal';
import * as React from 'react';

const DoctorsPage = () => {
  return (
    <div id="doctors-page">
      <Spinner />
      <Header />
      <TeamHorizontal/>
      <Map />
      <Footer />
    </div>
  )
}

export default DoctorsPage