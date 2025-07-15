import { LucideProps, User, Mail, Lock, Loader2 } from "lucide-react";

export const Icons = {
  user: User,
  mail: Mail,
  lock: Lock,
  spinner: (props: LucideProps) => (
    <Loader2 {...props} className="animate-spin" />
  ),
};
