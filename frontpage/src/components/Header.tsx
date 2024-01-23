import { Link } from "react-router-dom";
import * as React from 'react';
import { useEffect } from "react";
import { Database, onValue, ref } from "firebase/database";
import { Firestore, collection, getDocs } from 'firebase/firestore/lite';
import { db, dbStore } from "../utils/firebase";
import { useAtom } from "jotai";
import { basicInfoStore } from "../stores/basicInfoStore";
import { BasicInfo } from "../interfaces/interface";


const Header = () => {
  const [basicInfo, setBasicInfo] = useAtom(basicInfoStore);
  
  useEffect(() => {
    async function getBasicInfo(db: any) {
      const dataCol = collection(db, 'basic_information');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};
      for (var key in reqData) {
        const data: BasicInfo = {
          addressRef: reqData[key].addressRef,
          city: reqData[key].city,
          country: reqData[key].country,
          email: reqData[key].email,
          facebookAccount: reqData[key].facebookAccount,
          footerText: reqData[key].footerText,
          instagramAccount: reqData[key].instagramAccount,
          name: reqData[key].name,
          phoneNumber: reqData[key].phoneNumber,
          twitterAccount: reqData[key].twitterAccount,
          description: reqData[key].description,
          owner: reqData[key].owner,
          ownerPosition: reqData[key].ownerPosition,
        }
        setBasicInfo(data)
      }
    }

    getBasicInfo(dbStore).catch(console.error);
  }, [])

  return (
    <header>
      <div className="container">
        <div className="row">

          <div className="col-md-4 col-sm-5">
            <a href="/">
              <p>Welcome to a {basicInfo.name}</p>
            </a>
          </div>

          <div className="col-md-8 col-sm-7 text-align-right">
            <span
              className="phone-icon"
              onClick={() => window.open(`tel:${basicInfo.phoneNumber}`)}
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
              <i className="fa fa-envelope-o" style={{ marginRight: "5px", marginLeft: "10px" }}></i>
              <a>{basicInfo.email}</a>
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header;