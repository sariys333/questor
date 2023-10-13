import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { Quest } from "./types/Quest.types";

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

type FormValues = Pick<Quest, "content" |"category"> & {
    time: Dayjs[]
}

export function QuestEditComponent({ questId }: { questId: number }) {
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
        // const res = await QuestRepository.edit(data);
        // console.log(res);
    };

    return <div></div>;
}
