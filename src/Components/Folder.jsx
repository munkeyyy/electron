import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Folder = () => {
    const {id}=useParams()
    const [folder,setFolder]=useState({})
    useEffect(()=>{
      const folders = JSON.parse(localStorage.getItem("folders"))
      const singleFolder = folders.find((f) => f.id === parseInt(id))
      setFolder(singleFolder)
    },[])
  return (
    <div className='min-w-[200px] py-4 px-6 rounded-lg border border-[rgb(75,75,75)] bg-none hover:bg-[]'>
      <h1>{folder?.title}</h1>
      <div>
        {
          folder?.contents.map((content, index) => {
            return <div key={index}>{content}</div>
          })
        }
      </div>
    </div>
  )
}

export default Folder