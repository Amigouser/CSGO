import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) redirect("/");

  const tournaments = await prisma.tournament.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      participants: {
        include: { user: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return <AdminPanel tournaments={tournaments} />;
}
