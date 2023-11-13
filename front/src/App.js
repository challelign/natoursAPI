import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";

import Users from "./components/Users";
import Settings from "./components/Settings";
import { Toaster } from "react-hot-toast";
import Tours from "./components/Tours";
import TourDetail from "./ui/TourDetail";
import Login from "./components/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import UserProfile from "./ui/UserProfile";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordReset from "./components/ForgetPasswordReset";
import { DarkModeProvider } from "./context/DarkModeContext";
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
			// staleTime: 60 * 1000,
		},
	},
});

function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								path="/"
								index
								element={<Navigate replace to="dashboard" />}
							/>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="/dashboard/:slug" element={<TourDetail />} />
							<Route path="/tours" element={<Tours />} />
							<Route path="/users" element={<Users />} />
							<Route path="/users/:id" element={<UserProfile />} />
							<Route path="/settings" element={<Settings />} />
							{/* tours/${product.slug} */}
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/forget-password" element={<ForgetPassword />} />
						<Route
							path="/forget-password-rest/:token"
							element={<ForgetPasswordReset />}
						/>

						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>

				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "9px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "10px 24 px",
							backgroundColor: "var(---color-gray-0)",
							color: "var(--color-gray-700)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
