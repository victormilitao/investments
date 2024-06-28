import { Outlet } from "react-router-dom";

export function Public() {
  return (
    <div className="bg-ds-black-500 text-ds-white h-screen overflow-auto">
      <Outlet />
    </div>
  )
}

