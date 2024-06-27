interface SideMenuItemProps {
  children: React.ReactNode
}

export function SideMenuItem(props: SideMenuItemProps) {
  return (
    <div className='cursor-pointer lg:w-full'>
      {props?.children}
    </div>
  )
}