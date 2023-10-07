import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import { QuestPage } from './quest/Quest.Page';
import { Login } from './login/Login.Page';
import App from './routes/app/App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				"token": {
					"colorPrimary": "#FA8C16",
					"colorInfo": "#FA8C16",
					"colorSuccess": "#8ff95a",
					"colorWarning": "#faf814"
				},
				"algorithm": theme.darkAlgorithm
			}}
		>
			<Router>
				<Routes>
					<Route element={<App />}>
						<Route index element={<QuestPage />} />
						<Route path="quest" >
							<Route path="create" element={<>this is quest creation page</>}></Route>
						</Route>
					</Route>
					<Route path="login" element={<Login />}>
					</Route>
				</Routes>
			</Router>
		</ConfigProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
