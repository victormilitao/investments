import { toast } from "@/components/ui/use-toast"

export const toastError = (title: string, description?: string) => {
  toast({
    variant: "destructive",
    title: title,
    description: description,
  })
}
