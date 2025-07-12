import { useClerk } from "@clerk/clerk-react"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Onboarding = () => {
  const { user, isLoaded } = useClerk();
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    // console.log("role >>>", role)
    await user.update({
      unsafeMetadata: { role },
    })
      .then(() => {
        navigate(role === "candidate" ? "/jobs" : "/post-job")
      })
      .catch((error) => {
        console.error("Error updating user role:", error)
      })
  }

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user?.unsafeMetadata?.role === "candidate" ? "/jobs" : "/post-job")
    }
  }, [user])

  return (
    <>
        <div className=" text-white flex flex-col items-center justify-center mt-30">
          <section className="flex flex-col items-center justify-center w-full ">
            <h1 className="text-6xl font-bold mb-4">Im a...</h1>
            <div className="mt-10 grid grid-cols-2 gap-6 w-full md:px-40">
              <Button
                variant="yellow"
                className="h-36 text-2xl"
                onClick={() => handleRoleSelection('candidate')}
              >
                Candidate
              </Button>
              <Button
                variant="red"
                className="h-36 text-2xl"
                onClick={() => handleRoleSelection('recruiter')}
              >
                Recruiter
              </Button>
            </div>
            <p className="mt-6 text-gray-400">Select your role to continue</p>
          </section>
        </div>
    </>
  )
}

export default Onboarding;