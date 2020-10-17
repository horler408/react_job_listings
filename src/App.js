import React, {useState} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import useFetchJobs from './components/FetchJobs';
import Job from './components/Job'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const {jobs, loading, error} = useFetchJobs(params, page)
  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
    </Container>
  );
}

export default App;
