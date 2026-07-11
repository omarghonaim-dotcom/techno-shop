import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/nextAuth";
import MobileBottomNavClient from "./MobileBottomNavClient";



export default async function MobileBottomNav() {
  const session = await getServerSession(authOptions);
  const userImage = session?.user?.image || null;
  const userName = session?.user?.name || null;
  return (
    <MobileBottomNavClient userImage={userImage} userName={userName} />
  );
}