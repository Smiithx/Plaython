import { useUser } from "@clerk/nextjs";
import { TwoName } from "../../../lib/helpers/functions";

export function UserSidebar() {
  const { user } = useUser();
  return (
    <div className="p-4 border-t border-[#2D2D2D]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#9146FF] flex items-center justify-center text-white">
          <span className="font-bold">{TwoName(user?.firstName)}</span>
        </div>
        <div>
          <p className="font-medium text-white">{user?.fullName}</p>
          {/* <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <p className="text-xs text-gray-400">Nivel 42 • 12,345 XP</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export function UserContent() {
  const { user } = useUser();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Panel de Control
      </h1>
      <p className="text-gray-400">
        Bienvenid@ de nuevo,
        <span className="text-[#9146FF]"> {user?.firstName}</span>. Aquí tienes
        tu resumen.
      </p>
    </div>
  );
}
