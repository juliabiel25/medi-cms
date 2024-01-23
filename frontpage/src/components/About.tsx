import { useAtom } from 'jotai';
import * as React from 'react';
import { basicInfoStore } from '../stores/basicInfoStore';

const About = () => {
  const [basicInfo, setBasicInfo] = useAtom(basicInfoStore);
  
  return (
    <section id="about">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6">
            <div className="about-info">
              <h2 className="wow fadeInUp" data-wow-delay="0.6s">Welcome to {basicInfo.name} <br/><i className="fa fa-h-square"></i>ealth Center</h2>
              <div className="wow fadeInUp" data-wow-delay="0.8s">
                <p>{basicInfo.description}</p>
              </div>
              <figure className="profile wow fadeInUp" data-wow-delay="1s">
                <img src="images/author-image.jpg" className="img-responsive" alt="" />
                <figcaption>
                  <h3>{basicInfo.owner}</h3>
                  <p>{basicInfo.ownerPosition}</p>
                </figcaption>
              </figure>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About;