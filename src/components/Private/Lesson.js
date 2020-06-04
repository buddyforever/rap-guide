import React, { useContext } from 'react'
import { useParams } from "react-router-dom"

import LessonDashboardTeacher from '../Lesson/LessonDashboardTeacher'
import LessonDashboardStudent from '../Lesson/LessonDashboardStudent'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader'

import { useQuery } from '@apollo/react-hooks'
import { GET_LESSON_BY_ID } from '../../queries/lessons'

export const Lesson = () => {

  /* Context */
  // TODO check to see if the user has access
  const { user } = useContext(UserContext);

  /* Paramaters */
  let { id } = useParams();

  /* Queries */
  const { loading, data, refetch } = useQuery(GET_LESSON_BY_ID, {
    variables: {
      id: id
    }
  });

  if (loading) return <Loader />
  console.log(user);
  return (
    <>
      {user && user.type === 'educator' ?
        <LessonDashboardTeacher lesson={data.lesson} refetch={refetch} /> : (<LessonDashboardStudent lesson={data.lesson} refetch={refetch} />)
      }
    </>
  )
}

export default Lesson;
