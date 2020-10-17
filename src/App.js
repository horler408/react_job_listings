import React, {useState} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import useFetchJobs from './components/FetchJobs';
import Job from './components/Job';
import JobPagination from './components/jobPagination';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const {jobs, loading, error} = useFetchJobs(params, page)
  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <JobPagination page={page} setpage={setPage} hasNextPage={true}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
      <JobPagination page={page} setpage={setPage} hasNextPage={true}/>
    </Container>
  );
}

export default App;
