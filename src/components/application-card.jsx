import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { updateApplicationStatus } from '@/api/apiApplications'
import Loader from './loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ApplicationCard = ({ application, isCandidate = false }) => {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();

        console.log("link.hre >>>", link.href)
        console.log("applicatiom >>>", application)
    }

    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
        updateApplicationStatus, {
        job_id: application.job_id
    }
    );

    const handleStatusChange = (status) => {
        fnHiringStatus(status);
    }

    return (
        <div>
            <Card>
                {loadingHiringStatus && <Loader />}
                <CardHeader className="flex justify-between font-bold">
                    {isCandidate
                        ? `${application?.job?.title} at ${application?.job?.company?.name}`
                        : application?.name}

                    <Download
                        size={14}
                        className='bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer'
                        onClick={handleDownload}
                    />
                </CardHeader>
                <CardContent className="flex flex-col gap-4 flex-1">
                    <div className='flex flex-col md:flex-row lg:lex-row justify-between'>
                        <div className='flex gap-2 items-center'>
                            <BriefcaseBusiness size={15} />  {application?.experience} years of experience
                        </div>
                        <div className='flex gap-2 items-center'>
                            <School size={15} />  {application?.education}
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Boxes size={15} />  {application?.skills} years of experience
                        </div>
                    </div>
                    <hr />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <span>{new Date(application?.created_at).toLocaleString()}</span>
                    {isCandidate ? (
                        <span className="capitalize font-bold">
                            Status: {application.status}
                        </span>
                    ) : (
                        <Select
                            onValueChange={handleStatusChange}
                            defaultValue={application.status}
                        >
                            <SelectTrigger className="w-52">
                                <SelectValue placeholder="Application Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="applied">Applied</SelectItem>
                                <SelectItem value="interviewing">Interviewing</SelectItem>
                                <SelectItem value="hired">Hired</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default ApplicationCard 