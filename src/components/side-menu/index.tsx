interface SideMenuProps {
  children: React.ReactNode
}

export function SideMenu(props: SideMenuProps) {
  return (
    <div className="w-[280px] h-screen bg-ds-black-500 p-10 flex flex-col gap-3">
      {props.children}
    </div>
  )
}
