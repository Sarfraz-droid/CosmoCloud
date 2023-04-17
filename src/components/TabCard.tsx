import React, { Fragment, useContext, useEffect, useState } from "react";
import { TabState } from "../@types";
import { TabType, getDefaultState } from "../constants/enums.types";
import { useDebounce } from "use-debounce";
import { TabContext } from "../context/TabProvider";
import Switch from "react-switch";
import { Menu, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import AddButton from "./AddButton";

function TabCard({ tab, depth }: { tab: TabState; depth: number }) {
	const { updateTab, removeTab, addTab } = useContext(TabContext);
	const [isEditing, setIsEditing] = useState(false);
	const [currentTab, setCurrentTab] = useState(tab);
	const inputRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		updateTab(currentTab.parent, currentTab);
	}, [currentTab]);

	useEffect(() => {
		if (tab.id !== currentTab.id) setCurrentTab(tab);
	}, [tab]);

	return (
		<motion.div
			className="w-full flex flex-col border-l-2 border-black/20 border-dotted"
			// initial={{
			// 	opacity: 0,
			// 	y: -10,
			// }}
			// animate={{
			// 	opacity: 1,
			// 	y: 0,
			// 	marginTop: "0%",
			// }}
			// exit={{
			// 	opacity: 0,
			// 	y: -10,
			// }}
			transition={{ duration: 0.5 }}>
			<div className="bg-slate-100/20 m-1 p-1 flex flex-grow border-slate-300 gap-2 group ">
				<div className="flex flex-grow gap-3 ml-3">
					<AnimatePresence>
						{!isEditing ? (
							<motion.h1
								initial={{
									y: 0,
									opacity: 1,
								}}
								animate={{
									y: 0,
									opacity: 1,
								}}
								exit={{
									y: 10,
									opacity: 0,
								}}
								className="font-normal self-center p-1 pr-4 cursor-pointer hover:bg-slate-300 rounded-md transition-all active:bg-slate-400"
								onClick={() => {
									setIsEditing(true);
									setTimeout(() => {
										inputRef.current?.focus();
									}, 100);
								}}>
								{currentTab.name}
							</motion.h1>
						) : (
							<motion.input
								ref={inputRef}
								initial={{
									y: -10,
									opacity: 0,
								}}
								animate={{
									y: 0,
									opacity: 1,
								}}
								exit={{
									y: 10,
									opacity: 0,
								}}
								title="edit-tab"
								className="font-normal p-0 pl-2 ring-0 bg-slate-100 border-0 focus:border-slate-600 shadow-none focus:outline-none focus:outline-slate-200 focus:ring-slate-200 ring-slate-600 rounded-md "
								type="text"
								value={currentTab.name}
								onChange={(e) => {
									setCurrentTab({ ...currentTab, name: e.target.value });
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") setIsEditing(false);
								}}
								onBlur={() => {
									setIsEditing(false);
								}}
							/>
						)}
					</AnimatePresence>

					<Menu as="div" className="relative inline-block text-left">
						<div>
							<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
								{currentTab.type}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4 self-center">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								{[
									TabType.Boolean,
									TabType.Number,
									TabType.String,
									TabType.Object,
								].map((type, key) => (
									<Menu.Item key={key}>
										{({ active }) => (
											<button
												title={type}
												type="button"
												className={`px-4 py-1 w-full text-left ${
													currentTab.type === type
														? "bg-slate-600 text-white"
														: "hover:bg-slate-200"
												}`}
												onClick={() => {
													setCurrentTab({ ...currentTab, type: type });
												}}>
												{type}
											</button>
										)}
									</Menu.Item>
								))}
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
				<motion.div
					className={`gap-2 flex 
					transition-all duration-300 ease-in-out
					group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none opacity-0 `}>
					{tab.type === TabType.Object && (
						<AddButton
							onClick={(type) => {
								addTab(
									currentTab,
									getDefaultState([...currentTab.parent], type)
								);
							}}
						/>
					)}
					<p className="text-sm font-semibold self-center">Required</p>
					<Switch
						checked={currentTab.required}
						onChange={(checked) => {
							setCurrentTab({ ...currentTab, required: checked });
						}}
						className="self-center"
						uncheckedIcon={false}
						checkedIcon={false}
						height={14}
						width={28}
						handleDiameter={14}
					/>
					<button
						title="delete-tab"
						type="button"
						className="p-1 rounded-md hover:opacity-60"
						onClick={() => {
							// console.log("delete tab");
							removeTab(currentTab.parent, currentTab);
							setCurrentTab({ ...currentTab });
						}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-4 h-4">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</button>
				</motion.div>
			</div>
			<div className="ml-10">
				{currentTab.type === TabType.Object && (
					<div className="flex flex-col gap-2">
						{/* <AnimatePresence> */}
						{currentTab.children.map((child, index) => (
							<TabCard tab={child} key={index} depth={depth + 1} />
						))}
						{/* </AnimatePresence> */}
					</div>
				)}
			</div>
		</motion.div>
	);
}

export default TabCard;
