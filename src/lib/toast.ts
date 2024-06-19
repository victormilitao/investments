import { toast } from "@/components/ui/use-toast"

const type = {
  default: "default",
  success: "success",
  error: "error"
} as const

export const toastError = (title: string, description?: string) => {
  toast({
    variant: type.error,
    title: title,
    description: description,
  })
}

export const toastSuccess = (title: string, description?: string) => {
  toast({
    variant: type.success,
    title: title,
    description: description,
  })
}
