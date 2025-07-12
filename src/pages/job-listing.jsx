import { getJobs } from '@/api/apiJobs'
import { useUser } from "@clerk/clerk-react";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);


  console.log("jobs <<<>>>", jobs);

  return (
    <div>JobListing</div>
  )
}

export default JobListing;