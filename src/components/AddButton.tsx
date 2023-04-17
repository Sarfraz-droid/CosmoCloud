import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { TabType } from "../constants/enums.types";

function AddButton({ onClick }: { onClick: (type: TabType) => void }) {
	return (
		<Menu as="div" className="relative inline-block text-left self-center">
			<div>
				<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white p-1 self-center ring-0 text-sm font-semibold text-gray-900 shadow-sm  ring-inset ring-gray-300 hover:bg-gray-50">
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
							d="M12 4.5v15m7.5-7.5h-15"
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
				<Menu.Items className="absolute right-0 z-10 mt-2 w-32 gap-0 bg-white shadow-lg ring-0 flex flex-col rounded-lg">
					{[
						TabType.Boolean,
						TabType.Number,
						TabType.String,
						TabType.Object,
					].map((type, key) => (
						<Menu.Item as={Fragment} key={key}>
							{({ active }) => (
								<button
									title={type}
									type="button"
									className={`px-4 py-2 text-left 
									hover:bg-slate-200 rounded-md m-1
									`}
									onClick={() => {
										onClick(type);
									}}>
									{type}
								</button>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export default AddButton;
