import React, {useState} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import useFetchJobs from './components/FetchJobs';
import Job from './components/Job';
import JobPagination from './components/jobPagination';
import SearchForm from './components/SearchForm';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)

  const {jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param]: value}
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setpage={setPage} hasNextPage={hasNextPage}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>An error occured!</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
      <JobPagination page={page} setpage={setPage} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App;
