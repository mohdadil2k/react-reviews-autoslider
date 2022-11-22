import { useState , useEffect } from "react";
import { FaAngleRight, FaAngleLeft, FaQuoteRight } from "react-icons/fa";
import data from "./data";
import "./index.css";

function App() {
  const [reviewData, setReviewData] = useState(data);
  const [activeDiv, setActiveDiv] = useState(0);

  useEffect(()=>{
    const lastIndex = reviewData.length-1;
    if( activeDiv < 0 ){
      setActiveDiv(lastIndex)
    }
    if( activeDiv > lastIndex ){
      setActiveDiv(0)
    }
  },[activeDiv , setActiveDiv])
  
  useEffect(()=>{
    let autoSlide= setInterval(() => {
      setActiveDiv(activeDiv+1)
    }, 3000);
    return ()=>{
      clearInterval(autoSlide)
    }
  })
  return (
    <section className="main-section">
      <h1>
        <span>/</span> reviews
      </h1>
      {reviewData.map(({ image, title, name, quote, id }, indexId) => {
        let clsName = "next";
        if (indexId === activeDiv) {
          clsName = "current";
        }
        if(indexId === activeDiv - 1 || (activeDiv === 0 && indexId ===reviewData.length-1)){
          clsName = "prev"
        }
        return (
          <div key={id} className={`details-div ${clsName}`}>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <h5>{title}</h5>
            <p>{quote}</p>
            <i className="quotation">
              <FaQuoteRight />
            </i>
          </div>
        );
      })}
      <button className="left-arrow" onClick={() =>setActiveDiv(activeDiv-1)}>
        <FaAngleLeft />
      </button>
      <button className="right-arrow" onClick={() =>setActiveDiv(activeDiv+1)}>
        <FaAngleRight />
      </button>
    </section>
  );
}

export default App;
