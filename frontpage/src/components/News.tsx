import { collection, getDocs } from 'firebase/firestore/lite';
import * as React from 'react';
import { useEffect } from 'react';
import { INews } from '../interfaces/interface';
import { useAtom } from 'jotai';
import { newsStore, oneNewsStore } from '../stores/basicInfoStore';
import { dbStore } from '../utils/firebase';

const News = () => {
  const [news, setNews] = useAtom(newsStore),
    [oneNews, setOneNews] = useAtom(oneNewsStore);

  useEffect(() => {
    async function getNews(db: any) {
      const dataCol = collection(db, 'news');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const newsArray: INews[] = []

      let counter = 1
      for (var key in reqData) {
        let data: INews

        if (counter <= 3) {
          data = {
            authorRef: reqData[key].authorRef,
            categories: reqData[key].categories,
            date: reqData[key].date,
            imageRef: reqData[key].imageRef,
            text: reqData[key].text,
            title: reqData[key].title,
          }

          newsArray.push(data)
          counter++
        } else break
      }

      setNews(newsArray)
    }

    getNews(dbStore).catch(console.error);
  }, [])
  
  return (
    <section id="news" data-stellar-background-ratio="2.5">
      <div className="container">
        <div className="row">

          <div className="col-md-12 col-sm-12">
            {/* <!-- SECTION TITLE --> */}
            <div className="section-title wow fadeInUp" data-wow-delay="0.1s">
              <h2>Latest News</h2>
            </div>
          </div>

          {
            news.map((oneNews: INews) => {
              return (
                <div className="col-md-4 col-sm-6">
                  <a href="/articlesOne" onClick={() => setOneNews(oneNews)}>
                    <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s">
                      <a href="articlesOne">
                        <img src="images/news-image1.jpg" className="img-responsive" alt="" />
                      </a>
                      <div className="news-info">
                        <span>{oneNews.date}</span>
                        <h3><a href="articlesOne">{oneNews.title.substring(0, 60)}{oneNews.title.length > 60 ? '...' : ''}</a></h3>
                        <p>{oneNews.text.substring(0, 120)}{oneNews.text.length > 120 ? '...' : ''}</p>
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

        <div style={{ width: '100%', display: "flex", marginTop: "20px", justifyContent: "center" }}>
          <button id="cf-submit" name="meet" style={{ height: "40px", width: "200px", backgroundColor: "#A5C422", borderWidth: "0px", color: 'white', borderRadius: "3px", fontWeight: "600" }}>
            <a href="/articles">
              Read more
            </a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default News;