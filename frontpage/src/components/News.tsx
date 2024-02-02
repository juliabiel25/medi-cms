import { Firestore, collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import * as React from 'react';
import { useEffect } from 'react';
import { INews } from '../interfaces/interface';
import { useAtom } from 'jotai';
import { initialNews, newsStore, oneNewsStore } from '../stores/basicInfoStore';
import { dbStore } from '../utils/firebase';
import { getDataWithReferences } from '../utils/helpers';

const News = () => {
  const [news, setNews] = useAtom(newsStore),
    [oneNews, setOneNews] = useAtom(oneNewsStore);

  useEffect(() => {
    async function getNews(db: any) {
      getDataWithReferences(dbStore, 'news').then((data: any) => {                               
        const newsArray: INews[] = []

        let counter = 1
        const length = data.length
        data.map((d: any, index: number) => {
          if (counter <= 3) {
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
            counter++
          }
        })

          setNews(newsArray)
      })
    }

    if (news.length === 0) getNews(dbStore).catch(console.error);
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
    <section id="news" data-stellar-background-ratio="2.5">
      <div className="container">
        <div className="row">

          <div className="col-md-12 col-sm-12">
            <div className="section-title wow fadeInUp" data-wow-delay="0.1s">
              <h2>Latest News</h2>
            </div>
          </div>

          {
            news.map((oneNews: INews) => {
              return (
                <div className="col-md-4 col-sm-6" key={oneNews.id}>
                  <a href="/articlesOne" onClick={(e: any) => handleNavigation(e, oneNews)}>
                    <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s">
                    <div onClick={(e: any) => handleNavigation(e, oneNews)}>
                        <img src="images/news-image1.jpg" className="img-responsive" alt="" />
                      </div>
                      <div className="news-info">
                        <span>{oneNews.date}</span>
                        <h3><div>{oneNews.title.substring(0, 60)}{oneNews.title.length > 60 ? '...' : ''}</div></h3>
                        <p>{oneNews.text.substring(0, 120)}{oneNews.text.length > 120 ? '...' : ''}</p>
                        <div className="author">
                          <img src="images/author-image.jpg" className="img-responsive" alt="" />
                          <div className="author-info">
                            <h5>{oneNews.authorRef.name} {oneNews.authorRef.surname}</h5>
                            <p>{oneNews.authorRef.position}</p>
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