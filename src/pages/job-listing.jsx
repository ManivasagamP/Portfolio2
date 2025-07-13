import { getJobs } from '@/api/apiJobs'
import { getCompanies } from '@/api/apiCompanies';
import { useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from 'react'
import Loader from '@/components/loader';
import JobCard from '@/components/job-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city';

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [data, setData] = useState(null);
  const { isLoaded } = useUser();

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => { 
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  }

  if (!isLoaded) {
    return <Loader />
  }

  return (
    <div className='px-8'>
      <h1 className='text-white font-extrabold text-6xl sm:text-7xl text-center mt-4 pb-8'>
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className='h-14 flex w-full gap-2 items-center mb-3'
      >
        <Input
          type="text"
          placeHolder="Search jobs by title..."
          name="search-query"
          className="text-white h-full flex-1 px-4 bg-black/50 border-none"
        />
        <Button type="submit" className="h-full sm:w-28" variant="red">
          Search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2 '>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className=" bg-black/50 text-white border-gray-700">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger  className=" bg-black/50 text-white border-gray-700">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="destructive">
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <Loader />
      )}

      {loadingJobs === false && (
        <div className='px-8 mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length > 0 ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job.saved.length > 0}
                />
              );
            })
          ) : (
            <div> No jobs found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing;