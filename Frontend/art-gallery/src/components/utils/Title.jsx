import React from 'react'

function Title({logo,texto, mostrar}) {
  return (
    <div className="slider-title" onClick={()=>mostrar(0)}>
        <div>
          {logo}
          <h5>{texto}</h5>
        </div>
        <button className="btn-filter-title">▼</button>
      </div>
  )
}

export default Title;