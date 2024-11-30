import { DataTable } from "@/pages/admin/dataTable"
import { DatePicker } from "./datePicker"
import { ColumnDef } from "@tanstack/react-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select"
import { useEffect, useState } from "react"
import { useAxiosPrivate } from "@/hooks"
import { useToast } from "@/shadcn/components/ui/use-toast"

type EvaluationData = {
  id: string
  name: string
  email: string
  college: string
  date?: Date
}

export type Evaluator = EvaluationData & {
  allotedCollege?: string
  allocated: boolean
}

function Evaluation() {
  const axiosPrivate = useAxiosPrivate()
  const { toast } = useToast()

  const [reRender, setReRender] = useState(false)
  const [data, setData] = useState<Evaluator[]>([])
  const [colleges, setColleges] = useState<string[]>([])

  function submitEvaluation(evaluator: Evaluator) {
    axiosPrivate.post("/register/evaluation", {
      evaluatorId: evaluator.id,
      collegeName: evaluator.allotedCollege,
      visitDate: evaluator.date,
    })   
  }

  function unSubmitEvaluation(evaluator: Evaluator) {
    axiosPrivate.post("/register/evaluation/unregister", {
      evaluatorId: evaluator.id,
      collegeName: evaluator.allotedCollege,
    })
  }

  useEffect(() => {
    (async () => {
      const r1 = axiosPrivate.get("/fetch/collegeNames")
      const r2 = axiosPrivate.get("/fetch/evaluators")

      const [collegeNames, evaluators] = await Promise.all([r1, r2])

      // const evaluatorsData = (evaluators.data as EvaluationData[]).map((evaluator) => {
      //   return {
      //     ...evaluator,
      //     allocated: false,
      //     allotedCollege: undefined,
      //   }
      // })

      setColleges(collegeNames.data)
      setData(evaluators.data as Evaluator[])
    })()
  }, [])

  const columns: ColumnDef<Evaluator>[] = [
    {
      header: "Alloted",
      cell: ({ row }) => {
        return <input
          type="checkbox"
          checked={row.original.allocated}
          onChange={(e) => {
            if(e.target.checked) {
              if(row.original.allotedCollege === undefined || row.original.date === undefined) {
                toast({
                  variant: "destructive",
                  description: "Please select a date and alloted college",
                })
                return
              }
            }

            if (e.target.checked) {
              row.original.allocated = true
              submitEvaluation(row.original)
              toast({
                variant: "default",
                description: "Evaluation submitted",
              })
            } else {
              row.original.allocated = false
              unSubmitEvaluation(row.original)
              row.original.allotedCollege = undefined
              row.original.date = undefined
              toast({
                variant: "default",
                description: "Evaluation unsubmitted",
              })
            }

            setReRender(!reRender)
          }}
        />
      } 
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "college",
      header: "College",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      header: "Alloted college",
      cell: ({ row }) => {
        return (
          <Select value={row.original.allotedCollege} onValueChange={(value) => row.original.allotedCollege = value}>
            <SelectTrigger>
              <SelectValue placeholder="Alloted college" />
            </SelectTrigger>

            <SelectContent>
              {colleges.map((college) => {
                if (college !== row.original.college) {
                  return (
                    <SelectItem key={college} value={college}>
                      {college}
                    </SelectItem>
                  )
                }
              })}
            </SelectContent>
          </Select>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return <DatePicker initialDate={row.original.date} rowValues={row} />
      },
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}

export default Evaluation;