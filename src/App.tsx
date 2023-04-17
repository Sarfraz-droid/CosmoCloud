import { useContext, useState } from "react";
import "./App.css";
import TabProvider, { TabContext } from "./context/TabProvider";
import TabList from "./components/TabList";
import { TabType, getDefaultState } from "./constants/enums.types";
import AddButton from "./components/AddButton";
import toast, { Toaster } from "react-hot-toast";

function App() {
	const { addTab, tabData } = useContext(TabContext);

	return (
		<div className="p-5 h-screen w-screen bg-slate-200 flex justify-center items-center flex-col">
			<div className="bg-white/80 w-full md:w-1/2 p-3 rounded-md border-2 border-dotted">
				<div className="p-2 bg-slate-200 rounded-md flex flex-col">
					<div className="flex pb-3">
						<div className="w-10" />
						<div className="text-sm self-center font-semibold opacity-50 flex-grow">
							Field Name and Type
						</div>
						<div className="flex gap-2">
							<AddButton
								onClick={(type) => {
									addTab(null, getDefaultState([], type));
								}}
							/>
							<button
								type="button"
								className="bg-white hover:bg-slate-100  
								active:bg-slate-200 border border-slate-300
								rounded-md p-1 px-2 text-sm "
								onClick={() => {
									console.log(tabData);
									toast.success("Tab Data has been logged to console");
								}}>
								Save
							</button>
						</div>
					</div>
					<TabList />
				</div>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
