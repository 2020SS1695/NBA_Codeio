import Registration from "./registration"
import Evaluation from "./evaluation"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/shadcn/components/ui/tabs"

function AdminPage() {
  return (
    <div className="m-8">
      <Tabs defaultValue="evaluator-list">
        <TabsList className=" mb-8">
          <TabsTrigger value="evaluator-list">Evaluator List</TabsTrigger>
          <TabsTrigger value="register-college">Register College</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluator-list">
          <Evaluation />
        </TabsContent>

        <TabsContent value="register-college" className=" flex justify-center">
          <div className=" w-96">
            <Registration />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage