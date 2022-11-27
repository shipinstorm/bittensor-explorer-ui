/** @jsxImportSource @emotion/react */
import Identicon from "@polkadot/react-identicon";
import { css } from "@emotion/react";

const identiconStyle = css`
	cursor: default !important;
`;

export type AccountAvatarProps = {
	address: string;
	prefix?: number;
	size?: number;
	className?: string;
}

export const AccountAvatar = (props: AccountAvatarProps) => {
	const {address, prefix, size, className} = props;

	return (
		<Identicon
			css={identiconStyle}
			value={address}
			size={size}
			theme="polkadot"
			prefix={prefix}
			className={className}
		/>
	);
};
