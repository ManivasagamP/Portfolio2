import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPin, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { deleteJob, saveJob } from '@/api/apiJobs';
import Loader from './loader';

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { },
}) => {
    const [saved, setSaved] = useState(savedInit);
    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob
    } = useFetch(saveJob, {
        alreadySaved: saved
    });

    const { user } = useUser();

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });

        onJobSaved();
    }

    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
        job_id: job.id
    })

    const handleDeleteJob = async () => {
        await fnDeleteJob()
        onJobSaved();
    }

    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);

    return (
        <Card className="border-gray-500">
            {loadingDeleteJob && <Loader />}
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {job.title}

                    {
                        isMyJob && (
                            <Trash2Icon
                                fill='red'
                                size={18}
                                className='text-red-300 cursor-pointer'
                                onClick={handleDeleteJob}
                            />
                        )
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex items-center justify-between'>
                    {job.company && <img src={job?.company?.logo_url} alt={`${job?.company?.name} Logo`} className='h-6' />}

                    <div className='flex gap-2 items-center'>
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr className='border-gray-500' />
                {job.description.substring(0, job.description.indexOf('.'))}...
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button className={'w-full cursor-pointer bg-black/20 border-gray-500'} variant='outline'>
                        More Details
                    </Button>
                </Link>

                {!isMyJob && (
                    <Button
                        variant='outline'
                        className="w-15 bg-black/20 border-gray-500"
                        onClick={handleSaveJob}
                        disabled={loadingSavedJob}
                    >
                        {saved ?
                            <Heart size={20} stroke='red' fill='red' />
                            :
                            <Heart size={20} />
                        }
                    </Button>
                )}

            </CardFooter>
        </Card>
    )
}

export default JobCard   