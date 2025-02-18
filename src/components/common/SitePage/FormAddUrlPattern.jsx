import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import ButtonAction from "../Public/Button/ButtonAction";
import AddSiteLineInput from "../Public/Form/AddSiteLineInput";
import { useState } from "react";
import AddSiteDropdownInput from "../Public/Form/AddSiteDropdownInput";
import FormModalSelection from "./FormModalSelection";

export default function FormAddUrlPattern({
    register,
    watch,
    setValue,
    formErrors,
}) {
    const [checkboxValuable, setCheckboxValuable] = useState([]);
    const [checkboxPage, setCheckboxPage] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSelection, setSelectedSelection] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const formTypeOpt = [
        { value: 0, label: "Input" },
        { value: 1, label: "Dropdown" },
    ];

    const urlPatterns = watch("urlPattern") || [];

    const addPattern = () => {
        const updatedPatterns = [
            ...urlPatterns,
            { identifier: "", is_page: false },
        ];
        setValue("urlPattern", updatedPatterns);
        setCheckboxValuable((prev) => [...prev, false]);
        setCheckboxPage((prev) => [...prev, false]);
    };

    const splicePattern = (index) => {
        const updatedPatterns = urlPatterns.filter((_, i) => i !== index);
        setValue("urlPattern", updatedPatterns);
        setCheckboxValuable((prev) => prev.filter((_, i) => i !== index));
        setCheckboxPage((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleCheckboxValuable = (index) => {
        setCheckboxValuable((prev) => {
            const updatedStates = [...prev];
            updatedStates[index] = !updatedStates[index];
            return updatedStates;
        });
    };

    const toggleCheckboxPage = (index) => {
        setCheckboxPage((prev) => Array(prev.length).fill(false));
        const allPatterns = watch("urlPattern") || [];
        const updatedPatterns = allPatterns.map((pattern) => ({
            ...pattern,
            is_page: false,
        }));
        setValue("urlPattern", updatedPatterns);
        setCheckboxPage((prev) => {
            const updatedStates = [...prev];
            updatedStates[index] = !updatedStates[index];
            return updatedStates;
        });
        setValue(`urlPattern[${index}].form_id`, 1);
        setValue(`urlPattern[${index}].is_page`, true);
    };

    const updateSelection = (index, selection) => {
        setValue(`urlPattern[${index}].selection`, selection);
    };

    return (
        <>
            <div className='text-xl border-b pb-4 font-semibold text-gray-900'>
                Add URL Pattern
            </div>

            {urlPatterns.map((_, index) => (
                <div key={index} className='pb-5 border-b'>
                    <AddSiteLineInput
                        label={"Identifier"}
                        required
                        placeholder={"Enter identifier pattern"}
                        checkbox
                        checkboxLabel={"Valuable"}
                        checked={checkboxValuable[index] || false}
                        setChecked={() => toggleCheckboxValuable(index)}
                        className={"mt-5"}
                        {...register(`urlPattern[${index}].identifier`, {
                            required: "Identifier pattern is required",
                        })}
                        error={formErrors.pattern?.message}
                    />
                    {checkboxValuable[index] && (
                        <>
                            <AddSiteLineInput
                                label={"Form Id"}
                                required
                                disabled={checkboxPage[index]}
                                placeholder={"Enter form ID"}
                                checkbox
                                checkboxLabel={"Is Page?"}
                                checked={checkboxPage[index] || false}
                                setChecked={() => toggleCheckboxPage(index)}
                                className={"mt-2"}
                                {...register(`urlPattern[${index}].form_id`, {
                                    required: "Form ID is required",
                                })}
                                error={formErrors.pattern?.message}
                            />

                            <AddSiteDropdownInput
                                required
                                label={"Form Type"}
                                className={"mt-2"}
                                value={watch(`urlPattern[${index}].form_type`)}
                                {...register(`urlPattern[${index}].form_type`)}
                                onChange={(e) =>
                                    setValue(
                                        `urlPattern[${index}].form_type`,
                                        parseInt(e.target.value, 10)
                                    )
                                }
                                isDropdown={
                                    watch(`urlPattern[${index}].form_type`) ===
                                        1 ||
                                    watch(`urlPattern[${index}].form_type`) ===
                                        "1"
                                }
                                selectionClick={(e) => {
                                    e.preventDefault();
                                    setSelectedSelection(
                                        watch(`urlPattern[${index}].selection`)
                                    );
                                    setSelectedIndex(index);
                                    setModalOpen(true);
                                }}
                                error={formErrors.pattern?.message}
                            >
                                {formTypeOpt.map((item) => (
                                    <option
                                        key={item.label}
                                        value={item.value}
                                        selected={
                                            item.value ===
                                            watch(
                                                `urlPattern[${index}].form_type`
                                            )
                                        }
                                    >
                                        {item.label}
                                    </option>
                                ))}
                            </AddSiteDropdownInput>
                        </>
                    )}
                    <div className='mt-3 flex items-center justify-end'>
                        <ButtonAction
                            onClick={() => splicePattern(index)}
                            colorClass={"bg-red-600"}
                            hoverClass={"bg-red-400"}
                            customPadding={"px-2"}
                            text={<MinusIcon className='w-7 h-7' />}
                        />
                    </div>
                </div>
            ))}

            <div className='mt-5 flex items-center justify-end'>
                <ButtonAction
                    onClick={addPattern}
                    colorClass={"bg-blue-800"}
                    hoverClass={"bg-blue-600"}
                    text={<PlusIcon className='w-5 h-5' />}
                />
            </div>

            <FormModalSelection
                open={modalOpen}
                setOpen={setModalOpen}
                selection={selectedSelection}
                index={selectedIndex}
                updateSelection={updateSelection}
            />
        </>
    );
}
