import { useAtom } from 'jotai';
import * as React from 'react';
import { departmentsStore } from '../stores/basicInfoStore';
import { dbStore } from '../utils/firebase';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { Department } from '../interfaces/interface';

const AppointmentForm = () => {
  const [departments, setDepartments] = useAtom(departmentsStore),
    [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [date, setDate] = useState(''),
    [dep, setDep] = useState(''),
    [phone, setPhone] = useState(''),
    [message, setMessage] = useState('');

  useEffect(() => {
    async function getDepartments(db: any) {
      const dataCol = collection(db, 'departments');
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs.map(doc => doc.data());
      let reqData = {...dataList};

      const departmentsArray: Department[] = []

      for (var key in reqData) {
        let data: Department = {
          address: reqData[key].address,
          addressRef: reqData[key].addressRef,
          name: reqData[key].name,
        }

        departmentsArray.push(data)
      }

      setDepartments(departmentsArray)
      setDep(departmentsArray[0].name)
    }

    getDepartments(dbStore).catch(console.error);
  }, [])

  async function submit() {
    if (name !== "" && email !== "" && date !== "" && phone !== "" && message !== "") {
      await setDoc(doc(dbStore, "appointments", name), {
        name: name,
        email: email,
        date: date,
        department: dep,
        phoneNumber: phone,
        message: message
      });
    } else {
      window.alert("Fill all the fields before submitting!");
    }
  }

  return (
    <section id="appointment" data-stellar-background-ratio="3">
      <div className="container">
        <div className="row">

          <div className="col-md-6 col-sm-6">
            <img src="images/appointment-image.jpg" className="img-responsive" alt="" />
          </div>

          <div className="col-md-6 col-sm-6">
            <form id="appointment-form" role="form">

              <div className="section-title wow fadeInUp" data-wow-delay="0.4s">
                <h2>Make an appointment</h2>
              </div>

              <div className="wow fadeInUp" data-wow-delay="0.8s">
                <div className="col-md-6 col-sm-6">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Full Name" value={name} onChange={(e: any) => setName(e.target.value)}/>
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" value={email} onChange={(e: any) => setEmail(e.target.value)}/>
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="date">Select Date</label>
                  <input type="date" name="date" className="form-control" value={date} onChange={(e: any) => setDate(e.target.value)}/>
                </div>

                <div className="col-md-6 col-sm-6">
                  <label htmlFor="select">Select Department</label>
                  <select name="select-dep" className="form-control" value={dep} onChange={(e: any) => setDep(e.target.selectedOptions[0].label)}>
                    {
                      departments.map((dep: Department) => {
                        return <option key={dep.name} value={dep.name}>{dep.name}</option>
                      })
                    }
                  </select>
                </div>

                <div className="col-md-12 col-sm-12">
                  <label htmlFor="telephone">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" name="phone" placeholder="Phone" value={phone} onChange={(e: any) => setPhone(e.target.value)}/>
                  <label htmlFor="Message">Additional Message</label>
                  <textarea className="form-control" rows={5} id="message" name="message" placeholder="Message" value={message} onChange={(e: any) => setMessage(e.target.value)}></textarea>
                  <button className="form-control" id="cf-submit" name="submit" onClick={() => submit()}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AppointmentForm;