interface SideMenuProps {
  children: React.ReactNode
  className?: string
}

export function SideMenu({children, className}: SideMenuProps) {
  return (
    <div className={`${className} w-14 py-10 px-4 lg:w-full lg:max-w-[280px] h-full bg-ds-black-500 lg:px-10`}>
      <div className="flex flex-col gap-3 fixed">{children}</div>
    </div>
  )
}
