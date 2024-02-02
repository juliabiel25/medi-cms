import { useAtom } from 'jotai';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { doctorStore } from '../stores/basicInfoStore';
import { useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import { Doctor } from '../interfaces/interface';
import { dbStore } from '../utils/firebase';
import { getDataWithReferences } from '../utils/helpers';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useAtom(doctorStore)

  useEffect(() => {
    async function getDoctor(db: any) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id')

      getDataWithReferences(dbStore, 'doctors').then(async (d: any) => {
        if (id) {
          var services: any[] = []
          const returnData = await Promise.all(d[+id].data.services.map(async (service: any) => {
            const length = service._key.path.segments.length
            const ref = service._key.path.segments[length - 1]
            const documentRef = doc(dbStore, `services/${ref}`);
            const docSnapshot = await getDoc(documentRef);
            if (docSnapshot.exists()) {
              const obj = docSnapshot.data()
              services.push(obj)
            } else {
              console.error("Referenced document does not exist");
            }
          }))

          if (returnData) {
            const data: Doctor = {
              educationInformation: d[+id].data.educationInformation,
              email: d[+id].data.email,
              facebookAccount: d[+id].data.facebookAccount,
              fieldOfInterest: d[+id].data.fieldOfInterest,
              imagePath: {
                altName: d[+id].data.image.data.altName,
                name: d[+id].data.image.data.name,
                url: d[+id].data.image.data.url,
              },
              linkedInAccount: d[+id].data.linkedInAccount,
              name: d[+id].data.name,
              phoneNumber: d[+id].data.phoneNumber,
              specialty: d[+id].data.specialty,
              surname: d[+id].data.surname,
              services: services,
              id: d[+id].data.id,
            }
            setDoctor(data)
          }
        }
      })
    }

    getDoctor(dbStore).catch(console.error);
  }, [])
  
  return (
    <section id="news-detail" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="column">
          <div
            className="col-md-12 col-sm-5"
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <div className="col-md-4">
              <img
                src={doctor.imagePath.url}
                className="img-responsive" alt={doctor.imagePath.altName} />
            </div>

            <div
              style={{
                marginLeft: "10px"
              }}
            >
              <h4>Basic information</h4>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Name:
                </div>
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.name}</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Surame:
                </div>
                <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.surname}</p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <div
                  style={{
                    fontSize: '14pt',
                    fontWeight: '500'
                  }}
                >
                  Specialty:
                </div>
                  <p style={{ marginLeft: "5px", fontSize: "14pt", marginTop: '0.5%' }}>{doctor.specialty}</p>
              </div>

                <div className="news-tags">
                <h4>Field of interest</h4>
                <li><a>{doctor.fieldOfInterest}</a></li>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-sm-5">
            <div className="news-sidebar">
              <div className="news-tags">
                <h4>Services</h4>
                {
                  doctor.services.map((service, index) => {
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                      }}>
                        <i className="fa fa-solid fa-chevron-right" style={{marginTop: 3, marginRight: 3}}></i>
                        <div style={{fontWeight: '500'}}>{service.name} - {service.description}</div>
                      </div>
                    )
                  })
                }
              </div>

              <div className="news-author">
                <h4>Education</h4>
                <p>{doctor.educationInformation}</p>
              </div>

              <div className="contact-info">
                <h4>Contact</h4>
                <span
                  className="phone-icon"
                  onClick={() => window.open(`tel:${doctor.phoneNumber}`)}
                >
                  <p>
                    <i className="fa fa-phone"></i>{doctor.phoneNumber !== "" ? doctor.phoneNumber : 'Brak'}
                  </p>
                </span>

                <Link
                  to='#'
                  onClick={(e: any) => {
                    window.location.href = `mailto:${doctor.email}`;
                    e.preventDefault();
                  }}
                  className="email-icon"
                >
                  <p><i className="fa fa-envelope-o"></i>{doctor.email !== "" ? doctor.email : 'Brak'}</p>
                </Link>
                <p>
                  <i className="fa fa-linkedin"></i><a href={doctor.linkedInAccount}>{doctor.linkedInAccount !== "" ? doctor.linkedInAccount : 'Brak'}</a>
                </p>
                <p>
                  <i className="fa fa-facebook"></i><a href={doctor.facebookAccount}>{doctor.facebookAccount !== "" ? doctor.facebookAccount : 'Brak'}</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default DoctorDetail;

function getDoctor(dbStore: any) {
  throw new Error('Function not implemented.');
}
