import React from 'react'
import { JobCard } from "./JobCard";
import { useStateValue } from '../../../MyContexts/StateProvider.js'
import { useHistory } from 'react-router-dom'
import { useState } from 'react';
import { db  } from '../../../firebase';
import { useEffect } from 'react';
import './JobListing.css'
import { Typography } from '@mui/material';


export const JobListing = ({openLoginDialog}) => {

  const history=useHistory();

  const [{user},dispatch]=useStateValue();

  const jobsRef=db.collection('Listings');

  const[jobList,setJobList]=useState([]);

  useEffect(()=>{
    jobsRef
    .orderBy('createdAt')
    .onSnapshot(querySnapshot=>{
      const data=querySnapshot.docs.map(doc=>({
        ...doc.data(),
        id:doc.id
      }));
      setJobList(data);
    })
  },[user,jobsRef])

  return (
    <div style={{
      marginTop:"15vh"
    }}
    >
      <Typography color={"rgba(71,42,178)"} variant='h3' fontFamily={"serif"}
        sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
        >
            Job Listings
        </Typography>
      {
        jobList.empty?<>There are no job opportunities right now. Please visit later.</>:
        jobList.map(job=>(
          <JobCard
            jd={job.jd}
            jobtype={job.jobtype}
            location={job.location}
            rate={job.rate}
            time={job.createdAt}
            status="user"
            id={job.id}
          />
        ))
      }
      
    </div>
  )
}
