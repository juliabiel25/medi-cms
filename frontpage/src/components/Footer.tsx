import { useAtom } from 'jotai';
import * as React from 'react';
import { basicInfoStore, hoursStore, oneNewsStore } from '../stores/basicInfoStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { dbStore } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Hours } from '../interfaces/interface';

const Footer = () => {
  const [basicInfo, setBasicInfo] = useAtom(basicInfoStore),
    [hours, setHours] = useAtom(hoursStore),
    [oneNews, setOneNews] = useAtom(oneNewsStore);
  
  useEffect(() => {
    async function getHours(db: any) {
      const dataCol = collection(db, 'openingHours');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const hoursArray: Hours[] = []

      for (var key in reqData) {
        const data: Hours = {
          basicInfoRef: reqData[key].basicInfoRef,
          closeDate: reqData[key].closeDate,
          dayOfTheWeek: reqData[key].dayOfTheWeek,
          openDate: reqData[key].openDate,
        }
        hoursArray.push(data)
      }

      setHours(hoursArray)
    }

    getHours(dbStore).catch(console.error);
  }, [])

  function mapDays(day: number) {
    switch(day) {
      case 0:
        return 'Monday'
      case 1:
        return 'Tuesday'
      case 2:
        return 'Wednesday'
      case 3:
        return 'Thursday'
      case 4:
        return 'Friday'
      case 5:
        return 'Saturday'
      case 6:
        return 'Sunday'
      default:
        return ""
    }
  }
  
  return (
    <footer data-stellar-background-ratio="5">
      <div className="container">
        <div className="row">

          <div className="col-md-4 col-sm-4">
            <div className="footer-thumb">
              <h4 className="wow fadeInUp" data-wow-delay="0.4s">Contact Info</h4>
              <p>Fusce at libero iaculis, venenatis augue quis, pharetra lorem. Curabitur ut dolor eu elit consequat ultricies.</p>

              <div
                className="contact-info"
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <span
                  className="phone-icon"
                  onClick={() => window.open(`tel:${basicInfo.phoneNumber}`)}
                  style={{
                    marginBottom: "10px"
                  }}
                >
                  <i className="fa fa-phone"></i>
                  {basicInfo.phoneNumber}
                </span>
                <Link
                  to='#'
                  onClick={(e: any) => {
                    window.location.href = `mailto:${basicInfo.email}`;
                    e.preventDefault();
                  }}
                  className="email-icon"
                >
                  <i className="fa fa-envelope-o"></i>
                  <a href="#">{basicInfo.email}</a>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="footer-thumb">
              <div className="opening-hours">
                <h4 className="wow fadeInUp" data-wow-delay="0.4s">Opening hours</h4>
                {
                  hours.map((hour) => {
                    return (
                      <p key={hour.dayOfTheWeek}>{mapDays(hour.dayOfTheWeek)} <span>{hour.openDate} - {hour.closeDate}</span></p>
                    )
                  })
                }
              </div>

              <ul className="social-icon">
                <li>
                  <a href={basicInfo.facebookAccount} className="fa fa-facebook-square"></a>
                </li>
                <li>
                  <a href={basicInfo.twitterAccount} className="fa fa-twitter"></a>
                </li>
                <li>
                  <a href={basicInfo.instagramAccount} className="fa fa-instagram"></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-12 col-sm-12 border-top"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center'
            }}>
            <div>
              <div className="copyright-text">
                <p>Copyright 2018 Your Company | Design: Tooplate</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer;