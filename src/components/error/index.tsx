interface ErrorProps {
  message: string | undefined
}

export function Error(props: ErrorProps) {
  return <>{props.message && <p className="text-red-500">{props.message}</p>}</>
}
