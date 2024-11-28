import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Folder = () => {
    const {id}=useParams()
    const navigate = useNavigate()
  return (
    <div className='min-w-[200px] py-4 px-6 rounded-lg border border-[rgb(75,75,75)] bg-none hover:bg-[]'>Folder</div>
  )
}

export default Folder