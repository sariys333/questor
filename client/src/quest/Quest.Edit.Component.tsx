import {
    Checkbox,
    DatePicker,
    Form,
    Input,
    Radio,
    Space,
    TimePicker,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { useState } from "react";
import QuestRepository from "../repositories/Quest.Repository";
import { Category, Quest } from "./types/Quest.types";

const range = (value: number) => {
    const result = [];
    for (let i = 0; i < 60; i++) {
        if (!(i % value == 0)) {
            result.push(i);
        }
    }
    return result;
};

const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
    return {
        disabledMinutes: () => range(5),
    };
};

export class EditForm {
    questId: number;
    quest: Quest;
    time: Date[] = [];

    constructor(form: FormValues) {
        this.questId = form.questId;
        this.quest = form.quest;
        this.time = form.time.map((item) => item.toDate());
    }
}

type FormValues = {
    questId: number;
    quest: Quest;
    time: Dayjs[];
};

export function QuestEditComponent({ questId }: { questId: number }) {
    const [category] = useState<Category>(new Category());
    const [categoryLabel, setCategoryLabel] = useState<string>("선택");
    const [timeLabel, setTimeLabel] = useState<string>("기간 선택");
    const [timeValue, setTimeValue] = useState();
    const [day, setDay] = useState<boolean>(false);

    const onCategoryChange = (e: any) => {
        setCategoryLabel(e.target.value);
    };

    const timeChange = (e: any) => {
        setTimeValue(e);
    };

    const onCheck = (e: any) => {
        setTimeValue(undefined);
        if (e.target.checked) {
            setDay(true);
            setTimeLabel("시간 선택");
        } else {
            setDay(false);
            setTimeLabel("기간 선택");
        }
    };

    const onFinish = async (e: any) => {
        if (e.time.length == 2) {
            await editQuest(e);
        }
    };

    const editQuest = async (data: FormValues) => {
        const res = await QuestRepository.edit(new EditForm(data));
        console.log(res);
    };

    return <div></div>;
}
