interface MainContentProps {
  children: React.ReactNode
}

export function MainContent(props: MainContentProps) {
  return (<div className="p-10 mx-auto">{props.children}</div>)
}