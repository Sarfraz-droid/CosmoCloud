import React, { createContext, useEffect, useState } from "react";
import { TabState } from "../@types";
import { TabType } from "../constants/enums.types";

export const TabContext = createContext({
	tabData: [] as Array<TabState>,
	setTabData: (tabData: Array<TabState>) => {},
	addTab: (parent: TabState | null, item: TabState) => {},
	removeTab: (parent: Array<string>, item: TabState) => {},
	updateTab: (parent: Array<string>, item: TabState) => {},
});

function TabProvider({ children }: { children: React.ReactNode }) {
	const [tabData, setTabData] = useState<Array<TabState>>([]);

	useEffect(() => {
		console.log("tabData changed", tabData);
	}, [tabData]);

	const findTab = (
		parent: Array<string>,
		index: number,
		item: TabState,
		curr: TabState,
		operation: "update" | "remove" | "add"
	) => {
		if (parent[index] === curr.id) {
			console.log("Pathfinding", index, parent[index], parent.length, curr.id);
			if (index === parent.length - 1) {
				if (operation === "update") curr = item;
				else if (operation === "add") curr.children.push(item);
				else if (operation === "remove") {
					console.log("Removing", curr, curr.children, item);
					curr.children = curr.children.filter((child) => child.id !== item.id);
				}
			} else {
				curr.children = curr.children.map((child) => {
					if (child.id === parent[index + 1]) {
						return findTab(parent, index + 1, item, child, operation);
					}
					return child;
				});
			}
		}

		return curr;
	};

	const addTab = (parent: TabState | null, item: TabState) => {
		console.log("addTab", parent, item);
		if (parent == null) {
			setTabData((prev) => [...prev, item]);
		} else {
			if (parent.type !== TabType.Object)
				throw new Error("Parent is not an object");
			const addresses = parent.parent;
			let index = 0;
			let curr = tabData;

			curr = curr.map((child) => {
				if (addresses.length == index) {
					if (child.id === parent.id) child.children.push(item);
				} else if (child.id === addresses[index]) {
					child = findTab(addresses, index, item, child, "add");
				}
				return child;
			});

			setTabData(curr);
		}
	};

	const removeTab = (parent: Array<string>, item: TabState) => {
		if (parent.length == 1) {
			setTabData((prev) => prev.filter((tab) => tab.id !== item.id));
		} else {
			const addresses = parent.slice(0, parent.length - 1);
			let index = 0;
			let curr = tabData;

			curr = curr.map((child) => {
				if (child.id === addresses[index]) {
					child = findTab(addresses, index, item, child, "remove");
				}
				return child;
			});
		}
	};

	const updateTab = (parent: Array<string>, item: TabState) => {
		if (parent.length == 0) {
			setTabData((prev) =>
				prev.map((tab) => (tab.id === item.id ? item : tab))
			);
		} else {
			const addresses = parent;
			let index = 0;
			let curr = tabData;

			curr = curr.map((child) => {
				if (child.id === addresses[index]) {
					child = findTab(addresses, index, item, child, "update");
				}
				return child;
			});

			setTabData(curr);
		}
	};

	return (
		<TabContext.Provider
			value={{ tabData, setTabData, addTab, removeTab, updateTab }}>
			{children}
		</TabContext.Provider>
	);
}

export default TabProvider;
