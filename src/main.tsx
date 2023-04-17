import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TabProvider from "./context/TabProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<TabProvider>
			<App />
		</TabProvider>
	</React.StrictMode>
);
