import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Table from './components/table';

function App() {
  // eslint-disable-next-line 
  const [inputData, setInputData] = useState('')
  const [isOpen, setIsOpen] = useState(true)
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const [activeTab, setActiveTab] = useState('username')

  const handleClick = () => {
    const filteredData = data.filter((elem) => {
      switch (activeTab) {
        case 'username':
          return elem.username.includes(inputData.slice(0, 1).toUpperCase().concat(inputData.slice(1).toLowerCase())) || elem.username.includes(inputData)
        case 'name':
          return elem.name.includes(inputData.slice(0, 1).toUpperCase().concat(inputData.slice(1).toLowerCase())) || elem.name.includes(inputData)
        case 'email':
          return elem.email.includes(inputData.slice(0, 1).toUpperCase().concat(inputData.slice(1).toLowerCase())) || elem.email.includes(inputData)
        case 'website':
          return elem.website.includes(inputData)

        default:
          console.log('default');
      }
      return null;

    })
    setData(filteredData)
  }

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setData(res.data);
      setAllData(res.data)
    })
  }, [])

  const handleNav = (e) => {
    const array = document.getElementsByTagName('li')
    for (let i = 0; i < array.length; i++) {
      array[i].classList.remove('bg-blue-400')
    }
    e.target.classList.add('bg-blue-400')
    setActiveTab(e.target.innerText.toLowerCase())
  }
  const handleBar = (e) => {
    
    if (isOpen) {
      e.target.classList.add('fa-xmark')
      e.target.classList.remove('fa-bars')
      setIsOpen(!isOpen)
      document.getElementById('nav').classList.remove('-left-full')
      document.getElementById('nav').classList.add('left-0')
      
    } else {
      e.target.classList.remove('fa-xmark')
      e.target.classList.add('fa-bars')
      setIsOpen(!isOpen)
      document.getElementById('nav').classList.add('-left-full')
      document.getElementById('nav').classList.remove('left-0')
    }
  }
  return (
    <>
      <div className='flex '>
        <div className='h-[100vh] w-[80px] border-x-2 flex flex-col items-center justify-between'>
          <div className='flex flex-col items-center max-md:hidden'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNwoaGyTLldZUyw1tp668Of3Ogqab9ERpow&usqp=CAU" alt="vlogo" />
            <i className="fa-solid fa-shield-halved mt-8 text-4xl "></i>
            <div className='mt-8 text-3xl'>#</div>
          </div>
          <div className='max-md:hidden'>
            <i className="fa-solid fa-gear mb-4 text-2xl"></i>
          </div>
        </div>
        <div className='w-[calc(100vw-80px)] max-md:w-[100vw] bg-slate-200'>
          <div className='h-16 bg-white flex justify-between'>
            {/* Mobile Menu */}
            <i className="fa-solid fa-bars max-md:block md:hidden ps-4 pt-4 text-3xl" onClick={handleBar}></i>
            <div className='absolute top-14 -left-full bg-slate-700 w-[100vw] md:hidden transition-all ease-in-out duration-500 z-10 py-4 text-left' id='nav'>
              <ul className='py-2'>
                <li className='bg-blue-400 p-2 rounded-md' onClick={handleNav}>Username</li>
                <li className='p-2 rounded-lg' onClick={handleNav}>Name</li>
                <li className='p-2 rounded-md' onClick={handleNav}>Email</li>
                <li className='p-2 rounded-md' onClick={handleNav}>Website</li>
              </ul>
              <input type="text" className='py-2 outline-none rounded-md lg:w-[16vw]' placeholder={`  search for ${activeTab}`} onChange={(e) => setInputData(e.target.value)} />
              <button className='bg-white py-1 px-4 rounded-lg mx-2' onClick={handleClick}>search</button>
              <i className="fa-solid fa-rotate mx-2 cursor-pointer text-white" onClick={() => setData(allData)}></i>
            </div>
            <span></span>
            <span className='w-[180px] bg-slate-100 rounded-full mx-4 my-1 flex items-center'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0oOPjm3Ff-EHEB_2oyTMoZlvL8OqWSc74WXQqQIrcw&s" className='h-[40px] rounded-full mt-1  ms-2' alt="" />
              <div>
                <div className='ms-2 font-medium poppins tracking-wide'>ChethanB</div>
                <div className='ms-2 text-xs text-slate-400 font-serif'>Brand</div>
              </div>
              <i className="fa-solid fa-chevron-down ms-3"></i>
            </span>
          </div>
          <div className='ms-9 flex items-center mt-6 xl:justify-between max-lg:block max-md:hidden'>
            <nav className='flex items-center xl:justify-between '>
              <ul className='flex  justify-between poppins bg-white rounded-sm shadow-2xl'>
                <li className='bg-blue-400 p-2 rounded-md' onClick={handleNav}>Username</li>
                <li className='p-2 rounded-lg mx-4' onClick={handleNav}>Name</li>
                <li className='p-2 rounded-md mx-4' onClick={handleNav}>Email</li>
                <li className='p-2 rounded-md' onClick={handleNav}>Website</li>
              </ul>
              <i className="fa-solid fa-rotate mx-6 cursor-pointer " onClick={() => setData(allData)}></i>
              <div className='bg-white py-2 px-4 rounded-full shadow-2xl '><i className="fa-solid fa-circle-down me-2"></i>Download</div>
            </nav>
            <div className='flex justify-between max-lg:justify-normal max-lg:mt-6'>
              <input type="text" className='ms-6 py-2 outline-none rounded-md lg:w-[16vw]' placeholder={`  search for ${activeTab}`} onChange={(e) => setInputData(e.target.value)} />
              <button className='bg-white py-1 px-4 rounded-lg mx-2' onClick={handleClick}>search</button>
              <i className="fa-solid fa-filter pt-1 text-xl cursor-pointer"></i>
            </div>
            <div></div>
          </div>

          <Table data={data} />
        </div>
      </div>

    </>
  );
}

export default App;
