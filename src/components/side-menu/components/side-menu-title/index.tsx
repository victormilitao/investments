interface SideMenuTitleProps {
  title: string
}

export function SideMenuTitle(props: SideMenuTitleProps) {
  return (<p className="text-lg font-bold mb-4 ">{props.title}</p>)
}