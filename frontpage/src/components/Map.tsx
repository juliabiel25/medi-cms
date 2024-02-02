import { useAtom } from 'jotai';
import * as React from 'react';
import { basicInfoStore } from '../stores/basicInfoStore';

const Map = () => {
  return (
    <section id="google-map">
     {/* <!-- How to change your own map point
            1. Go to Google Maps
            2. Click on your location point
            3. Click "Share" and choose "Embed map" tab
            4. Copy only URL and paste it within the src="" field below
	--> */}
          <iframe 
          title="map" 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.1392281023673!2d16.94707937663863!3d52.40415284480006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b85e236103b%3A0x8030a1c59859cfa9!2sCentrum%20Wyk%C5%82adowe%20PP!5e0!3m2!1spl!2spl!4v1706008820984!5m2!1spl!2spl"
          width="100%" 
          height="350" 
          frameBorder="0" 
          // style="border:0" 
          allowFullScreen></iframe>
     </section>

  )
}

export default Map;