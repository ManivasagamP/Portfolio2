import { useUser } from "@clerk/clerk-react"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"

const Onboarding = () => {
  const {user, isLoaded} = useUser()

  if(!isLoaded){
    return <Loader />
  }

  return (
    <div className=" text-white flex flex-col items-center justify-center mt-30">
      <section className="flex flex-col items-center justify-center w-full ">
        <h1 className="text-6xl font-bold mb-4">Im a...</h1>
        <div className="mt-10 grid grid-cols-2 gap-6 w-full md:px-40">
          <Button variant="yellow" className="h-36 text-2xl">Candidate</Button>
          <Button variant="red" className="h-36 text-2xl">Recruiter</Button>
        </div>
        <p className="mt-6 text-gray-400">Select your role to continue</p>
      </section>
    </div>
  )
}

export default Onboarding