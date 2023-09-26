import { redirect } from "next/navigation";
import { DataTable } from "./_components/DataTable";
import { Columns } from "./_components/Columns";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const Courses = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={Columns} data={courses} />
    </div>
  );
};

export default Courses;
