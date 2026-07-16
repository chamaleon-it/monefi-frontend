import { ApplicationFormInterface, FormDataInterface } from "@/interface/ApplicationForm.interface";
import { useCallback, useState } from "react";

export default function useApplicationForm():ApplicationFormInterface {
  const [stage, setStage] = useState(1);
  const [formDate, setFormDate] = useState<FormDataInterface>({
    email:"text@gmail.com"
  });

  const gotoPreviousStage = useCallback(() => {
    setStage((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const gotoNextStage = useCallback(() => {
    setStage((prev) => {
      if (prev < 10) {
        return prev + 1;
      }
      return prev;
    });
  }, []);

  return { stage, setStage, formDate, setFormDate,gotoPreviousStage,gotoNextStage };
}


