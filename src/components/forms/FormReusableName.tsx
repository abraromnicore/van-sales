// FormReusableName.tsx
import * as React from "react";

import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { TextArea } from "./TextArea";
import { Checkbox } from "./CheckBox";
import { DatePicker } from "./DatePicker.";
import { FileUpload } from "./FileUpload";
import EmailIcon from "../../assets/icons/EmailIcon";
import { CalendarIcon, CheckIcon, UploadIcon } from "lucide-react";
import SelectDropdown from "./SelectDropdown";

// Export all components as a single object for easy importing
const FormReusableName = {
    InputField,
    TextArea,
    SelectDropdown,
    Checkbox,
    DatePicker,
    FileUpload,
};

// Also export individual components for direct importing
export {
    InputField,
    TextArea,
    SelectDropdown,
    Checkbox,
    DatePicker,
    FileUpload,
};

// Default export the collection
export default FormReusableName;

// ===== USAGE EXAMPLES =====

export const MyForm = () => {
    const { register, formState: { errors } } = useForm();

    return (
        <form className="grid grid-cols-2 gap-4 p-4">
            <InputField
                register={register}
                name="emailOrUsername"
                placeholder="Enter your email or username"
                type="text"
                imageSVG={EmailIcon}
                errors={errors}
                isDisabled={false}
            />

            <TextArea
                name="description"
                label="Project Description"
                placeholder="Enter detailed description..."
                rows={6}
                maxLength={500}
                imageSVG={EmailIcon}
                register={register}
                errors={errors}
                isDisabled={false}
            />

            {/* <SelectDropdown
                name="category"
                label="Project Category"
                placeholder="Choose a category..."
                // imageSVG={<EmailIcon>}
                options={[
                    { value: "web", label: "Web Development" },
                    { value: "mobile", label: "Mobile App" },
                    { value: "design", label: "UI/UX Design" }
                ]}
                control={control}
                errors={errors}
                isDisabled={false}
            /> */}

            <Checkbox
                name="terms"
                label="I agree to the Terms and Conditions"
                description="By checking this box, you agree to our privacy policy and terms of service."
                //   imageSVG={<CheckIcon />} 
                register={register}
                errors={errors}
                isDisabled={false}
            />

            <DatePicker
                name="birthdate"
                label="Birth Date"
                type="date"
                min="1900-01-01"
                max="2010-12-31"
                imageSVG={<CalendarIcon />}
                register={register}
                errors={errors}
                isDisabled={false}
            />

            <FileUpload
                name="resume"
                label="Upload Resume"
                accept=".pdf,.doc,.docx"
                multiple={false}
                maxSize={5}
                imageSVG={<UploadIcon />}
                register={register}
                errors={errors}
                isDisabled={false}
            />
        </form>
    );
};

