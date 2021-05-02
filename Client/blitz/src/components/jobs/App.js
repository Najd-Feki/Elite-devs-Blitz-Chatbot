import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import JobsPagination from './JobsPagination';
/* import { Container } from 'react-bootstrap';
 */ import Spinner from 'react-bootstrap/Spinner';
import Job from './Job';
import SearchForm from './SearchForm';
import Header from 'components/headers/light';
import tw, { css } from 'twin.macro';
import Footer from 'components/footers/SimpleFooter';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }
  return (
    <>
      <Header />
      <Container className='mt-2'>
        <Content>
          <h1 className='mb-2 '>
            GitHub Jobs
            <i class='fa fa-github ml-2'></i>
          </h1>
          <SearchForm params={params} onParamChange={handleParamChange} />
          <JobsPagination
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
          {loading && (
            <h1>
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            </h1>
          )}
          {error && <h1>Error ! Try Refreshing .</h1>}
          {jobs.map((job) => {
            return <Job key={job.id} job={job} />;
          })}
          <JobsPagination
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
          />
        </Content>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default App;
