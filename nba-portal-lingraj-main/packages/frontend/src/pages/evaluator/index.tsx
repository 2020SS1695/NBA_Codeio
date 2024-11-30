import { useAuth, useAxiosPrivate } from "@/hooks"
import { useEffect, useState } from "react"
import { EvaluatorInfo } from "../college"

type EvaluatorAdditionalInfo = EvaluatorInfo & {
    allotedCollege?: string
}

function EvaluatorPage() {
    const { authState } = useAuth()

    const axiosPrivate = useAxiosPrivate()
    const [evaluator, setEvaluator] = useState<EvaluatorAdditionalInfo | null>(null)

    useEffect(() => {
        (async () => {
            const evaluations = (await axiosPrivate.get("/fetch/evaluations")).data
            const evaluatorRaw = evaluations.filter((evaluator: any) => evaluator.email === authState?.email)

            const evaluator = evaluatorRaw.map((evaluator: any) => ({
                name: evaluator.name,
                email: evaluator.email,
                college: evaluator.college,
                date: evaluator.date,
                allotedCollege: evaluator.allotedCollege
            }))

            setEvaluator(evaluator[0])
        })()
    }, [])

    return (
        <>
            {
                evaluator ? (
                    <div className=" mx-8">
                        <h1 className=" text-3xl mb-8 font-semibold">Evaluator Information</h1>
                        <div className=" border p-4 mb-4">
                            <h2 className=" text-lg font-semibold">{evaluator?.name}</h2>
                            <p className=" text-sm text-gray-500">{evaluator?.email}</p>
                            <p className=" text-sm text-gray-500">{evaluator?.college}</p>
                            <p className=" text-sm text-gray-500">{(new Date(evaluator.date)).toLocaleDateString()}</p>
                            <p className=" text-sm text-gray-500"><b>Alloted College: </b>{evaluator?.allotedCollege}</p>
                        </div>
                    </div>
                ) : (
                    <p>No college assigned</p>
                )
            }
        </>
    )
}

export default EvaluatorPage