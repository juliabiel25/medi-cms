import { useAtom } from 'jotai';
import * as React from 'react';
import { newsStore, oneNewsStore } from '../stores/basicInfoStore';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { INews } from '../interfaces/interface';
import { dbStore } from '../utils/firebase';

const NewsHorizontal = () => {
  const [news, setNews] = useAtom(newsStore),
    [oneNews, setOneNews] = useAtom(oneNewsStore);

  useEffect(() => {
    async function getNews(db: any) {
      const dataCol = collection(db, 'news');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const newsArray: INews[] = []

      for (var key in reqData) {
        let data: INews = {
          authorRef: reqData[key].authorRef,
          categories: reqData[key].categories,
          date: reqData[key].date,
          imageRef: reqData[key].imageRef,
          text: reqData[key].text,
          title: reqData[key].title,
        }
        newsArray.push(data)
      }

      setNews(newsArray)
    }

    getNews(dbStore).catch(console.error);
  }, [])
  
  return (
    <section id="newshorizontal" data-stellar-background-ratio="2.5">
      <div className="container">
        <div className="row">

          <div className="col-md-12 col-sm-12" style={{ marginTop: "20px" }}>
            <div className="section-title wow fadeInUp" data-wow-delay="0.1s">
              <h2>Latest News</h2>
            </div>
          </div>

          {
            news.map((newsO) => {
              return (
                <div className="col-sm-12">
                  <a href="/articlesOne" onClick={() => setOneNews(newsO)}>
                    <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s" style={{ display: 'flex', flexDirection: "row" }}>
                      <div style={{ width: '30%' }}>
                        <img src="images/news-image1.jpg" className="img-responsive" alt="" />
                      </div>
                      <div className="news-info" style={{ width: "70%" }}>
                        <span>{newsO.date}</span>
                        <h3>{newsO.title.substring(0, 60)}{oneNews.text.length > 60 ? '...' : ''}</h3>
                        <p>{newsO.text.substring(0, 120)}{oneNews.text.length > 120 ? '...' : ''}</p>
                        <div className="author">
                          <img src="images/author-image.jpg" className="img-responsive" alt="" />
                          <div className="author-info">
                            <h5>Jeremie Carlson</h5>
                            <p>CEO / Founder</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              )
            })
          }
        </div>

        <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center", marginBottom: "20px" }}>
        </div>
      </div>
    </section>
  )
}

export default NewsHorizontal;