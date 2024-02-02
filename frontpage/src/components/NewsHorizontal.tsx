import { useAtom } from 'jotai';
import * as React from 'react';
import { initialNews, newsStore, oneNewsStore } from '../stores/basicInfoStore';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { INews } from '../interfaces/interface';
import { dbStore } from '../utils/firebase';
import { getDataWithReferences } from '../utils/helpers';

const NewsHorizontal = () => {
  const [news, setNews] = useAtom(newsStore),
    [oneNews, setOneNews] = useAtom(oneNewsStore);

  useEffect(() => {
    async function getNews(db: any) {
      getDataWithReferences(dbStore, 'news').then((data: any) => {                               
        const newsArray: INews[] = []

        const length = data.length
        data.map((d: any, index: number) => {
          data = {
            authorRef: {
              description: d.data.author.data.description,
              name: d.data.author.data.name,
              surname: d.data.author.data.surname,
              position: d.data.author.data.position
            },
            categories: {},
            date: d.data.date,
            imageRef: d.data.imageRef,
            text: d.data.text,
            title: d.data.title,
            id: index,
          }
          newsArray.push(data)
        })

        setNews(newsArray)
      })
    }

    getNews(dbStore).catch(console.error);
  }, [])

  useEffect(() => {
    if (oneNews !== initialNews)
      window.location.href = `/articlesOne?id=${oneNews.id}`;
  }, [oneNews])

  async function handleNavigation(e: any, newsOn: INews) {
    e.preventDefault();
    await setOneNews(newsOn);
  }
  
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
            news.map((newsO: INews, index: number) => {
              return (
                <div className="col-sm-12" key={index}>
                  <a href="/articlesOne" onClick={(e: any) => handleNavigation(e, newsO)}>
                    <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s" style={{ display: 'flex', flexDirection: "row" }}>
                      <div style={{ width: '30%' }}>
                        <img src="images/news-image1.jpg" className="img-responsive" alt="" />
                      </div>
                      <div className="news-info" style={{ width: "70%" }}>
                        <span>{newsO.date}</span>
                        <h3>{newsO.title.substring(0, 60)}{newsO.title.length > 60 ? '...' : ''}</h3>
                        <p>{newsO.text.substring(0, 120)}{newsO.text.length > 120 ? '...' : ''}</p>
                        <div className="author">
                          <img src="images/author-image.jpg" className="img-responsive" alt="" />
                          <div className="author-info">
                            <h5>{newsO.authorRef.name} {newsO.authorRef.surname}</h5>
                            <p>{newsO.authorRef.position}</p>
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