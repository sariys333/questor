import React, { useEffect, useState } from "react";
import { QuestListComponent } from "./Quest.List.Component";
import QuestRepository from "../repositories/Quest.Repository";
import { Quest } from "./types/Quest.types";
import { QuestCreateComponent } from "./Quest.Create.Component";
import { Link, Outlet } from "react-router-dom";

// import { Quest } from './Quest.Item.Props';

export function QuestPage() {
    return (
        <>
            <Outlet />
        </>
    );
}
