import { useForm } from "react-hook-form";
import ButtonAction from "../../Public/Button/ButtonAction";
import SingleLineInput from "../../Public/Form/SingleLineInput";
import ManageTemplateInformation from "./ManageTemplateInformation";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";
import { useGetHTMLMutation } from "../../../../services/scrape/scrapeApiSlice";
import Spinner from "../../Public/Spinner";
import { useState } from "react";

export default function GetHTMLTemporary() {
    const [htmlData, setHtmlData] = useState("");

    const {
        register,
        watch,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            exampleURL: "",
        },
        mode: "onChange",
    });

    const [getHTML, { isLoading: getHTMLLoading }] = useGetHTMLMutation();

    const onSubmit = async (siteUrl) => {
        const request = {
            url: siteUrl,
        };
        await getHTML(request)
            .unwrap()
            .then((response) => {
                setHtmlData(response.data);
            })
            .catch(() => {
                setHtmlData("Failed to get HTML response");
            });
    };

    return (
        <>
            <ManageTemplateInformation />
            <div className='flex flex-row justify-between gap-x-2 mt-4'>
                <div className='w-2/3'>
                    <SingleLineInput
                        required
                        placeholder={"Enter example included web data URL "}
                        {...register("exampleURL", {
                            required: "Example URL is required",
                        })}
                        error={formErrors.exampleURL?.message}
                    />
                </div>
                <div>
                    <ButtonAction
                        onClick={() => onSubmit(watch("exampleURL"))}
                        colorClass={"bg-[#17479D]"}
                        hoverClass={"bg-blue-600"}
                        text={"Get HTML Source"}
                    />
                </div>
            </div>
            <div className='mt-4 border'>
                {getHTMLLoading ? (
                    <Spinner />
                ) : (
                    <CodeMirror
                        value={htmlData}
                        className='h-auto max-h-[51vh] overflow-y-auto'
                        options={{
                            theme: "github",
                            keyMap: "sublime",
                            mode: "htmlmixed",
                            lineNumbers: true,
                            extraKeys: {
                                "Ctrl-F": "findPersistent",
                            },
                        }}
                    />
                )}
            </div>
        </>
    );
}
