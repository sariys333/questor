import { ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./routes/app/App";
import { DashboardPage } from "./routes/app/dashboard/Dashboard.Page";
import { Login } from "./routes/login/Login.Page";
import { QuestListComponent } from "./routes/quest/Quest.List.Component";
import { QuestPage } from "./routes/quest/Quest.Page";
import { QuestViewerComponent } from "./routes/quest/viewer/Quest.Viewer.Component";
import { UserSettingPage } from "./routes/settings/User.Setting.Page";
import { Signup } from "./routes/signup/Signup.Page";
import { StartPage } from "./routes/start/Start.Page";
import store from "./store/Store";

// dayjs().locale('de').format()
dayjs.locale("ko");
dayjs().format();
dayjs.extend(relativeTime);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

export const MyTheme = {
    primary: "#8788ee",
    error: "#cf6679",
    success: "#00ff98",
    warning: "#fff468",
    info: "#bb86fc",
    link: "#8788ee",
    bgBase: "#181818",
};

root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        borderRadius: 0,
                    },
                    Input: {
                        borderRadius: 0,
                        borderRadiusLG: 0,
                    },
                    Radio: {
                        borderRadius: 0,
                        borderRadiusLG: 0,
                    },
                    Select: {
                        borderRadiusLG: 0,
                    },
                    InputNumber: {
                        borderRadiusLG: 0,
                    },
                    DatePicker: {
                        borderRadius: 0,
                        borderRadiusLG: 0,
                    },
                    Typography: {
                        fontFamily:
                            "'Young Serif', -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
                    },
                    Avatar: {
                        fontFamily: "'Young Serif'",
                    },
                },
                token: {
                    colorPrimary: MyTheme.primary,
                    colorError: MyTheme.error,
                    colorSuccess: MyTheme.success,
                    colorWarning: MyTheme.warning,
                    colorInfo: MyTheme.info,
                    colorLink: MyTheme.link,
                    colorBgBase: MyTheme.bgBase,
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route element={<App />}>
                            <Route index element={<DashboardPage />}></Route>
                            <Route path="quest" element={<QuestPage />}>
                                <Route index element={<QuestListComponent />} />
                                <Route
                                    path="create"
                                    element={<QuestViewerComponent create />}
                                />
                                <Route
                                    path="view/:questId"
                                    element={
                                        <QuestViewerComponent create={false} />
                                    }
                                />
                            </Route>
                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route path="start" element={<StartPage />} />
                        <Route path="setting" element={<UserSettingPage />} />
                    </Routes>
                </Router>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
