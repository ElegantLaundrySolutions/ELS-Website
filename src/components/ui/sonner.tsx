import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    toastOptions={{ classNames: { toast: "font-sans rounded-2xl" } }}
    {...props}
  />
);

export { Toaster };
