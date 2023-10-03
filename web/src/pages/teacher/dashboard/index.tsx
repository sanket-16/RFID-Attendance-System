import Layout from "@/components/teacher/Layout"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

const TeacherDashboard = () => {
  return (
    <Layout>
      <>
        <CardDescription>TeacherDashboard / Home</CardDescription>
        <CardContent className="grid gap-8 p-4 md:grid-cols-3">
          <div className="h-4 md:col-span-3" />

          <Card className="h-[10vh] p-4">
            <CardDescription className="font-bold">Class Title</CardDescription>
            <CardContent className="py-2 text-muted-foreground">
              <p>45/60</p>
            </CardContent>
          </Card>
          <Card className="h-[10vh] p-4">
            <CardDescription className="font-bold">Class Title</CardDescription>
            <CardContent className="py-2 text-muted-foreground">
              <p>45/60</p>
            </CardContent>
          </Card>
          <Card className="h-[10vh] p-4">
            <CardDescription className="font-bold">Class Title</CardDescription>
            <CardContent className="py-2 text-muted-foreground">
              <p>45/60</p>
            </CardContent>
          </Card>
          <div className="h-4 md:col-span-3" />
          <Card className="h-[40vh] p-4 md:col-span-3">
            <CardDescription className="font-bold">Class Title</CardDescription>
          </Card>
        </CardContent>
      </>
    </Layout>
  )
}

export default TeacherDashboard
