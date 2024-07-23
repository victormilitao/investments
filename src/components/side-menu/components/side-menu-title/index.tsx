interface SideMenuTitleProps {
  title: string
}

export function SideMenuTitle(props: SideMenuTitleProps) {
  return (<p className="text-lg font-bold my-2 ">{props.title}</p>)
}