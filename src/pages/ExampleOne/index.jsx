import React from "react";
import { Title } from "../../components/elements";
import { Autocomplete } from "../../components/fragments";

//#region change the collection with api link or your custom link collection
const dataCollection = [
    { id: 1, itemValue: "Leslie Alexander" },
    { id: 2, itemValue: "haha" },
    { id: 3, itemValue: "The 1975" },
    { id: 4, itemValue: "woah boah" },
    { id: 5, itemValue: "harry poah" },
    { id: 6, itemValue: "mask" },
    { id: 7, itemValue: "who" },
    { id: 8, itemValue: "That's The Spirit" },
];
//#endregion

export default function ExampleOne() {
    return (
        <div>
            <Title>Dashboard</Title>
            <Autocomplete
                options={dataCollection}
                placeholder={"choose one what u needed"}
            />
        </div>
    );
}
