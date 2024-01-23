import { useAtom } from 'jotai';
import * as React from 'react';
import { doctorStore, doctorsStore } from '../stores/basicInfoStore';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Doctor } from '../interfaces/interface';
import { dbStore } from '../utils/firebase';
import { Link } from 'react-router-dom';

const TeamHorizontal = () => {
  const [doctors, setDoctors] = useAtom(doctorsStore),
    [doctor, setDoctor] = useAtom(doctorStore)

  useEffect(() => {
    async function getDoctors(db: any) {
      const dataCol = collection(db, 'doctors');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const doctorArray: Doctor[] = []

      for (var key in reqData) {
        let data: Doctor = {
          educationInformation: reqData[key].educationInformation,
          email: reqData[key].email,
          facebookAccount: reqData[key].facebookAccount,
          fieldOfInterest: reqData[key].fieldOfInterest,
          imagePath: reqData[key].imagePath,
          imageRef: reqData[key].imageRef,
          linkedInAccount: reqData[key].linkedInAccount,
          name: reqData[key].name,
          phoneNumber: reqData[key].phoneNumber,
          specialty:reqData[key].specialty,
          surname: reqData[key].surname,
          services: reqData[key].services,
        }
        doctorArray.push(data)
      }

      setDoctors(doctorArray)
    }

    getDoctors(dbStore).catch(console.error);
  }, [])
  
  return (
    <section id="team" data-stellar-background-ratio="1">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6" style={{marginTop: "-50px"}}>
            <div className="about-info">
              <h2 className="wow fadeInUp" data-wow-delay="0.1s">Our Doctors</h2>
            </div>
          </div>

          <div className="clearfix"></div>

          {
            doctors.map((doctor: Doctor) => {
              return (
                <div className="col-md-4 col-sm-6">
                  <a 
                    href="/doctorsOne"
                    onClick={() => setDoctor(doctor)}
                  >
                    <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                      <img src="images/team-image1.jpg" className="img-responsive" alt="" />

                      <div className="team-info">
                        <h3>{doctor.name} {doctor.surname}</h3>
                        <p>{doctor.specialty}</p>
                        <div className="team-contact-info">
                          <p onClick={() => window.open(`tel:${doctor.phoneNumber}`)}><i className="fa fa-phone"></i>{doctor.phoneNumber}</p>
                          <p>
                            <Link
                              to='#'
                              onClick={(e: any) => {
                                window.location.href = `mailto:${doctor.email}`;
                                e.preventDefault();
                              }}
                              className="email-icon"
                            >
                              <i className="fa fa-envelope-o"></i> <i>{doctor.email}</i>
                            </Link>
                          </p>
                        </div>
                        <ul className="social-icon">
                          <li><a href={doctor.linkedInAccount} className="fa fa-linkedin-square"></a></li>
                          <li>
                            <Link
                              to='#'
                              onClick={(e: any) => {
                                window.location.href = `mailto:${doctor.email}`;
                                e.preventDefault();
                              }}
                              style={{paddingLeft: 13, paddingRight: 13, paddingTop: 11, paddingBottom: 13}}
                            ><i className="fa fa-envelope-o"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>

        <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
        </div>
      </div>
    </section>
  )
}

export default TeamHorizontal;