interface SideMenuProps {
  children: React.ReactNode
}

export function SideMenu(props: SideMenuProps) {
  return (
    <div className="w-[280px] h-full bg-ds-black-500 p-10">
      <div className="flex flex-col gap-3 fixed">{props.children}</div>
    </div>
  )
}
