import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import { QuestPage } from "./quest/Quest.Page";
import reportWebVitals from "./reportWebVitals";
import App from "./routes/app/App";
import { Login } from "./routes/login/Login.Page";
import { Signup } from "./routes/signup/Signup.Page";
import { StartPage } from "./routes/start/Start.Page";
import { UserSettingPage } from "./routes/user/User.Setting.Page";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { QuestCreateComponent } from "./quest/Quest.Create.Component";
import { QuestListComponent } from "./quest/Quest.List.Component";
import { Provider } from "react-redux";
import store from "./redux/Store";

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
                },
                token: {
                    colorPrimary: "#FA8C16",
                    colorInfo: "#FA8C16",
                    colorSuccess: "#8ff95a",
                    colorWarning: "#faf814",
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route element={<App />}>
                            <Route element={<QuestPage />}>
                                <Route index element={<QuestListComponent />} />
                                <Route
                                    path="quest/create"
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
