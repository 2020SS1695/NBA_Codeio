import { useEffect, useState } from "react"
import Registration from "./registration"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/shadcn/components/ui/tabs"
import { useAuth, useAxiosPrivate } from "@/hooks"

export type EvaluatorInfo = {
  name: string
  email: string
  college: string
  date: Date
}

function CollegePage() {
  const { authState } = useAuth()

  const axiosPrivate = useAxiosPrivate()
  const [evaluator, setEvaluator] = useState<EvaluatorInfo | null>(null)

  useEffect(() => {
    (async () => {
      const evaluations = (await axiosPrivate.get("/fetch/evaluations")).data
      const evaluatorRaw = evaluations.filter((evaluator: any) => evaluator.allotedCollege === authState?.collegeName)
      const evaluator = evaluatorRaw.map((evaluator: any) => ({
        name: evaluator.name,
        email: evaluator.email,
        college: evaluator.college,
        date: evaluator.date
      }))

      setEvaluator(evaluator[0])
    })()
  }, [])

  return (
    <div className="m-8">
      <Tabs defaultValue="register-evaluator">
        <TabsList className=" mb-8">
          <TabsTrigger value="register-evaluator">Register Evaluator</TabsTrigger>
          <TabsTrigger value="evaluation-status">Evaluation Status</TabsTrigger>
        </TabsList>

        <TabsContent value="register-evaluator" className=" flex justify-center">
          <div className=" w-96">
            <Registration />
          </div>
        </TabsContent>

        <TabsContent value="evaluation-status">
          {
            evaluator ? (
              <>
                <h1 className=" text-3xl mb-8 font-semibold">Evaluator Information</h1>
                <div className=" border p-4 mb-4">
                  <h2 className=" text-lg font-semibold">{evaluator.name}</h2>
                  <p className=" text-sm text-gray-500">{evaluator.email}</p>
                  <p className=" text-sm text-gray-500">{evaluator.college}</p>
                  <p className=" text-sm text-gray-500">{(new Date(evaluator.date)).toLocaleDateString()}</p>
                </div>
              </>
            )
              : <p>No evaluator assigned</p>
          }
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CollegePage