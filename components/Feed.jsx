'use client';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

const Feed = () => {

  const router = useRouter();
  const [students, setStudents] = useState([])
  const handleEdit = (id) => {
    router.push(`/update-student?id=${id}`)
  }

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('http://127.0.0.1:8009/api/students');
      const data = await response.json();
      setStudents(data);
      // console.log(data); 
    }
    fetchStudents()
  }, [])
  return (
    <div>
      {students.map((student) => (
        <div 
        className="text-center text-lg cursor-pointer p-3 bg-orange-500 rounded-lg text-white mb-3 mt-3 flex-col"
         key={student.id}
         onClick={() => {handleEdit(student.id)}}>{student.name}</div>
      ))}
    </div>
  )
}

export default Feed