/*import React from 'react'
import axios from "axios"
import { useEffect ,useState } from 'react'



export const Redactmaterials = ( ) => {
    const [name, setName] = useState('');
    const [require, setrequire] = useState([]);
    const [materlist, setMaterlist] = useState([]);
    const [datamaterlist, setDatamaterlist] = useState([]);
    const [storedValue, setStoredValue] = useState();
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [cursname, setcn] = useState("");
    const [curscost, setcc] = useState('');
    const [cursdur, setcd] = useState('');
    const [curstime, setct] = useState('');
    useEffect(() => {
      async function fetchData() {
        const storedItem = sessionStorage.getItem('myKey');
        setStoredValue(parseInt(storedItem));
        const responseMat = await axios.get('http://localhost:3001/matlist');
        setDatamaterlist(responseMat.data);
        const responseReq = await axios.get('http://localhost:3001/reqlist');
        setrequire(responseReq.data);
        let fan = require.filter((item) => item.CursId === storedValue)
        setrequire(fan)
        setLoading(false);

      }

      fetchData()

      async function fetchData2() {
        let materdata = datamaterlist.filter((item) => item.Id === storedValue)
        setMaterlist(materdata)
        setLoading2(false);
      }
    fetchData2()

    async function fetchData3() {
      setcn()
      setcc()
      setcd()
      setct()
      setLoading3(false);
      
    }
  fetchData3()
     
    }, []);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (loading2) {
      return <div>Loading...</div>;
    }
    if (loading3) {
      return <div>Loading...</div>;
    }
      
console.log(materlist)
      function getname(req){
        let filt = datamaterlist.filter((item) => item.Id === req.ReqId)
        return filt[0].CursName
        
      }
      const handlename = (event) => {
        setcn(event.target.value);
      };
      const handlecost = (event) => {
        setcc(event.target.value);
      };
      const handledur = (event) => {
        setcd(event.target.value);
      };
      const handletime = (event) => {
        setct(event.target.value);
      };
        
    const OnFinish = e => {
        e.preventDefault();
 
        let changeid = storedValue

    axios.post("http://localhost:3001/editmat",{changeid,cursname, curscost,cursdur,curstime,require})
    .then(res =>{
      if(res.data === "good"){
        sessionStorage.clear();
        setTimeout(() => { 
          window.location.reload();
          }, 500);
      }
      
      
    })
    
    console.log(require)
  }

    return (
      <div class = "meme">
        <form class="form-req" onSubmit= {OnFinish}>
          <h3>Редактирование предмета</h3>
          <div className="mb-3">
            <label>Название предмета</label>
            <input
              minLength={1}
              required
              value={cursname}
              name = "Cursname"
              className="form-control"
              placeholder="Напишите название предмета"
              onChange={handlename}
            />
          </div>

          <div className="mb-3">
            <label>Стоимость в кредитах</label>
            <input
              minLength={1}
              required
              value={curscost}
              onChange={handlecost}
              name = "cost"
              type="number"
              className="form-control"
              placeholder="Напишите стоимость"
            />
            <datalist></datalist>
          </div>

          <div className="mb-3">
            <label>Продолжительность курса по модулям</label>
            <input
              minLength={1}
              required
              name = "duration"
              value={cursdur}
              onChange={handledur}
              max = "4"
              min = '1'
              type="number"
              className="form-control"
              placeholder="Напишите сколько модулей идет курс"
            />
          </div>
          <div className="mb-3">
            <label>Длительность предмета в учебных часах</label>
            <input
              min = "1"
              required
              name = "time"
              value={curstime}
              onChange={handletime}
              type="number"
              className="form-control"
              placeholder="Напишите длительность"
            />
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" >
              Изменить
            </button>
          </div>
        </form>
        <form class="form-req" >
        <h3>Редактирование зависимостей</h3>
        <select  defaultValue="none" onChange={e => setName(e.target.value)} >
        <option value="none" disabled hidden/> 
        {datamaterlist.map((option, index) => (
            <option  value={option.Id}>{option.CursName}</option> 
         ))}
        </select>

        <button onClick={(e) => {
        e.preventDefault()
        const hasname = require.some(item => item.ReqId === parseInt(name));
        if (name.length > 0 && !hasname){
          
          setrequire([
            ...require,
            {Cursid:storedValue,ReqId:parseInt(name)}
          ]);
        }
        }}>Добавить</button>
        <ul>
        {require.map(req => (
          <li key={req.CursId}>{getname(req)}
          <button onClick={(e) => {
                e.preventDefault()
                let result = require.filter(a => a.ReqId !== req.ReqId)
               setrequire(result)

            }}>
              Удалить
            </button>
          </li>
        ))}
        </ul>
        </form>
      </div>

      
      
    )
 
}
*/


import React from 'react'
import axios from "axios"
import { useEffect ,useState } from 'react'



export const Redactmaterials = ( ) => {
    const [name, setName] = useState('');
    const [require, setrequire] = useState([]);
    const [materlist, setMaterlist] = useState([]);
    const [paramA, setParamA] = useState(localStorage.getItem('a'));
    const [paramB, setParamB] = useState(localStorage.getItem('b'));
    useEffect(() => {
      axios.post("http://localhost:3001/materiallist")
        .then((res) => {
          const a = res.data;
          a.forEach((entry) => {
            setMaterlist(prevMaterlist => {
              return [...prevMaterlist, entry.CursName];
            });
          });
        })
        .catch(error => console.error('Error:', error));
    }, []);


    const OnFinish = e => {
        e.preventDefault();
    const cursname = e.target.Cursname.value;
    const curscost = e.target.cost.value;
    const cursdur = e.target.duration.value;
    
    const curstime = e.target.time.value;

    axios.post("http://localhost:3001/crmat",{cursname, curscost,cursdur,curstime})
    .then(res =>{
      if(res.data === "already"){
        console.log("Имя занято")
        alert("Предмет с таким названием уже существует")
      }
      if(res.data === "sled")
      { if(require.length > 0 ){

        axios.post("http://localhost:3001/crusnameid",{cursname})
      .then(res =>{
        
        const vara = res.data
        const cursid = vara[0].Id
        console.log(cursid)
        require.forEach((reqe) => {
          const reqid = reqe
          axios.post("http://localhost:3001/reqnameid",{reqid})
      .then(res =>{
        const varb = res.data
        const reqid2 = varb[0].Id
        console.log(reqid2)
              axios.post("http://localhost:3001/crreq",{cursid,reqid2})
      })
        });
      })}
      setTimeout(() => {
        window.location.reload();
        }, 500);
      }
    })
    
    console.log(require)
  }

    return (
      <div class = "meme">
        <form class="form-req" onSubmit= {OnFinish}>
          <h3>Создание нового предмета</h3>
          <div className="mb-3">
            <label>Название предмета</label>
            <input
              minLength={1}
              required
              name = "Cursname"
              className="form-control"
              placeholder="Напишите название предмета"
            />
          </div>

          <div className="mb-3">
            <label>Стоимость в кредитах</label>
            <input
              minLength={1}
              required
              name = "cost"
              type="number"
              className="form-control"
              placeholder="Напишите стоимость"
            />
            <datalist></datalist>
          </div>

          <div className="mb-3">
            <label>Продолжительность курса по модулям</label>
            <input
              minLength={1}
              required
              name = "duration"
              max = "4"
              min = '1'
              type="number"
              className="form-control"
              placeholder="Напишите сколько модулей идет курс"
            />
          </div>
          <div className="mb-3">
            <label>Длительность предмета в учебных часах</label>
            <input
              min = "1"
              required
              name = "time"
              type="number"
              className="form-control"
              placeholder="Напишите длительность"
            />
          </div>
          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" >
              Добавить
            </button>
          </div>
        </form>
        <form class="form-req" >
        <h3>Редактирование зависимостей</h3>
        <select  defaultValue="none" onChange={e => setName(e.target.value)} >
        <option value="none" disabled hidden/> 
        {materlist.map((option, index) => (
            <option  value={option}>{option}</option> 
         ))}
        </select>

        <button onClick={(e) => {
        e.preventDefault()
        const hasname = require.some(item => item === name);
        if (name.length > 0 && !hasname){
          
          setrequire([
            ...require,
            name
          ]);
        }
        }}>Добавить</button>
        <ul>
        {require.map(req => (
          <li key={req.name}>{req}
          <button onClick={(e) => {
                e.preventDefault()
                let result = require.filter(a => a !== req)
                setrequire(result)

            }}>
              Удалить
            </button>
          </li>
        ))}
        </ul>
        </form>
        
      </div>

      
      
    )
 
}

