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
import { UserSettingPage } from "./routes/settings/User.Setting.Page";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { QuestCreateComponent } from "./quest/Quest.Create.Component";
import { QuestListComponent } from "./quest/Quest.List.Component";
import { Provider } from "react-redux";
import store from "./store/Store";
import { CookiesProvider } from "react-cookie";

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
            <CookiesProvider>
                <Provider store={store}>
                    <Router>
                        <Routes>
                            <Route element={<App />}>
                                <Route element={<QuestPage />}>
                                    <Route
                                        index
                                        element={<QuestListComponent />}
                                    />
                                    <Route
                                        path="quest/create"
                                        element={<QuestCreateComponent />}
                                    />
                                </Route>
                            </Route>
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            <Route path="start" element={<StartPage />} />
                            <Route
                                path="setting"
                                element={<UserSettingPage />}
                            />
                        </Routes>
                    </Router>
                </Provider>
            </CookiesProvider>
        </ConfigProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
