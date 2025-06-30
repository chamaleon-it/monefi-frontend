export interface ApplicationFormInterface {
     stage: number;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    formDate: FormDataInterface;
    setFormDate: React.Dispatch<React.SetStateAction<FormDataInterface>>;
     gotoPreviousStage: () => void,
     gotoNextStage: () => void
}


export interface FormDataInterface {
    email?:string;
    accountType?:string;
}