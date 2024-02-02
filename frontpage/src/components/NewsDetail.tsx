import { useAtom } from "jotai";
import { oneNewsStore } from "../stores/basicInfoStore";
import NewsThumb from "./NewsThumb";
import * as React from 'react';
import { useEffect } from "react";
import { dbStore } from "../utils/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { INews } from "../interfaces/interface";
import { getDataWithReferences } from "../utils/helpers";

const NewsDetail = () => {
  const [oneNews, setOneNews] = useAtom(oneNewsStore)

  useEffect(() => {
    async function getNew(db: any) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id')

      getDataWithReferences(dbStore, 'news').then(async (data: any) => {                             
        if (id) {
          var categories: string[] = []
          const returnData = await Promise.all(data[+id].data.categories.map(async (category: any) => {

            const length = category._key.path.segments.length
            const ref = category._key.path.segments[length - 1]

            const documentRef = doc(dbStore, `categories/${ref}`);
            const docSnapshot = await getDoc(documentRef);
            if (docSnapshot.exists()) {
              const obj = docSnapshot.data().name
              categories.push(obj)
            } else {
              console.error("Referenced document does not exist");
            }
          }))

          if (returnData) {
            data = {
              authorRef: {
                description: data[+id].data.author.data.description,
                name: data[+id].data.author.data.name,
                surname: data[+id].data.author.data.surname,
                position: data[+id].data.author.data.position
              },
              categories: categories,
              date: data[+id].data.date,
              imageRef: {
                altName: data[+id].data.altName,
                name: data[+id].data.name,
              },
              text: data[+id].data.text,
              title: data[+id].data.title,
              id: id,
            }
          }
          setOneNews(data)
        }
      })
    }

    getNew(dbStore).catch(console.error);
  }, [])

  return (
    <section id="news-detail" data-stellar-background-ratio="0.5">
      <div className="container">
        <div className="row">

          <div className="col-md-8 col-sm-7">
            <NewsThumb />
          </div>

          <div className="col-md-4 col-sm-5">
            <div className="news-sidebar">
              <div className="news-author">
                <h4>About the author</h4>
                <p>{oneNews.authorRef.name} {oneNews.authorRef.surname}, {oneNews.authorRef.position}</p>
                <p>{oneNews.authorRef.description}</p>
              </div>

              <div className="news-tags">
                <h4>Categories</h4>
                {
                  oneNews.categories.map((category, index) => {
                    return <li key={index}><a>{category}</a></li>
                  })
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default NewsDetail;