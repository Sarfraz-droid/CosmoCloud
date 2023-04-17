import React, { useContext, useEffect } from "react";
import { TabContext } from "../context/TabProvider";
import TabCard from "./TabCard";

function TabList() {
	const { tabData } = useContext(TabContext);

	return (
		<div>
			{tabData.map((tab, index) => {
				return (
					<div className="flex w-full" key={index}>
						<div className="w-10 self-start pt-4 pl-4 font-semibold opacity-50">
							{index + 1}.
						</div>
						<TabCard tab={tab} key={tab.id} depth={0} />
					</div>
				);
			})}
		</div>
	);
}

export default TabList;
