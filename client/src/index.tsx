import { ConfigProvider, theme } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import { QuestCreateComponent } from "./quest/Quest.Create.Component";
import { QuestListComponent } from "./quest/Quest.List.Component";
import { QuestPage } from "./quest/Quest.Page";
import reportWebVitals from "./reportWebVitals";
import App from "./routes/app/App";
import { Login } from "./routes/login/Login.Page";
import { UserSettingPage } from "./routes/settings/User.Setting.Page";
import { Signup } from "./routes/signup/Signup.Page";
import { StartPage } from "./routes/start/Start.Page";
import store from "./store/Store";
import { DashboardPage } from "./routes/app/dashboard/Dashboard.Page";

// dayjs().locale('de').format()
dayjs.locale("ko");
dayjs().format();
dayjs.extend(relativeTime);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

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
                    },
                    Radio: {
                        borderRadius: 0,
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
                },
                token: {
                    colorPrimary: "#8788ee",
                    colorError: "#cf6679",
                    colorSuccess: "#00ff98",
                    colorWarning: "#fff468",
                    colorInfo: "#bb86fc",
                    colorLink: "#8788ee",
                    colorBgBase: "#181818",
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
                                    element={<QuestCreateComponent />}
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
