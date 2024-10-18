import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormContainerProps } from "@/types";

const FormContainer = ({ children, header, desc }: FormContainerProps) => {
  return (
    <Card className="border-2 border-slate-300 my-8">
      <CardHeader>
        {header && <CardTitle>{header}</CardTitle>}
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormContainer;
