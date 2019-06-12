import React from "react";
// https://www.npmjs.com/package/react-spinners
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

export default ({
	isLoading,
	text,
	loadingText,
	className = "",
	disabled = false,
	...props
}) => (
	<button
		className={`LoaderButton ${className}`}
		disabled={disabled || isLoading}
		{...props}
	>
		{isLoading && (
			<HashLoader
				sizeUnit={"px"}
				size={50}
				color={"#123abc"}
				loading={isLoading}
			/>
        )}
        {!isLoading ? text : loadingText}
	</button>
);
