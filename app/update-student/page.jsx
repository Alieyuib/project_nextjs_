'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const UpdateStudent = () => {
    const searchParams = useSearchParams();
    const studentId = searchParams.get('id');
    const [student, setStudent] = useState({});
    const [updating, setUpdating] = useState(false);

    const getStudentData = async () => {
      const response = await fetch(`http://127.0.0.1:8009/api/student/${studentId}`)
      const data = await response.json();
      setStudent(data);
  }
    useEffect(() => {
        if(studentId) getStudentData();
    }, [studentId])
    const handleDisable = async (id) => {
      const response = await fetch(`http://127.0.0.1:8009/api/student/disable/${id}`)
      const data = await response.json();
      if (data.status === 200) {
        getStudentData();
        alert('success');
      }
    }
    const handleEnable = async (id) => {
      const response = await fetch(`http://127.0.0.1:8009/api/student/enable/${id}`)
      const data = await response.json();
      if (data.status === 200) {
        getStudentData();
        alert('success');
      }
    }
   return (
     <div className="card p-10 m-10 text-center bg-orange-100 w-1/2">
      <p className="text-gray-500">
        <span className="font-bold">Student Fullname:</span>
        <span className="ml-5">{student.name}</span>
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Current Class:</span>
        <span className="ml-5">{student.current_class}</span>
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Date of Birth:</span>
        <span className="ml-5">{student.dob}</span>
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Parent/Guardian:</span>
        <span className="ml-5">{student.guardian}</span>
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Status:</span>
        <span className="ml-5">
          {student.active === 'active' && (
            <span className="text-green-500">{student.active}</span>
          )}
          {student.active === 'inactive' && (
            <span className="text-red-500">{student.active}</span>
          )}
        </span>
      </p>
      <p>
        {student.active === 'active' && (
          <button onClick={() => handleDisable(student.id)} type="button" disabled={updating} className="p-5 m-5 rounded-md text-white bg-red-500">
              Disable student
          </button>
        )}
        {student.active === 'inactive' && (
          <button onClick={() => handleEnable(student.id)} type="button" disabled={updating} className="p-5 m-5 rounded-md text-white bg-green-500">
              Enable student
          </button>
        )}
      </p>
     </div>
   )
 }
 
 export default UpdateStudent