import { DataError } from "../utils/error";

export type Subnet = {
	id: string;
	netUid: number;
	name?: string;
	createdAt: bigint;
	owner: string;
	extrinsicId: number;
	emission: number;
	recycled24H: bigint;
	recycledAtCreation: bigint;
	recycledByOwner: bigint;
	recycledLifetime: bigint;
	timestamp: string;
};

export type SubnetHistory = {
	subnetId: bigint;
	height: bigint;
	timestamp: string;
	emission: bigint;
	raoRecycled: bigint;
};

export type SubnetHistoryPaginatedResponse = {
	hasNextPage: boolean;
	endCursor: string;
	data: SubnetHistory[];
};

export type SubnetHistoryResponse = {
	loading: boolean;
	error?: DataError;
	data: SubnetHistory[];
	ids: number[];
};

export type SubnetOwner = {
	id: string;
	netid: bigint;
	height: bigint;
	owner: string;
};

export type SubnetOwnerPaginatedResponse = {
	hasNextPage: boolean;
	endCursor: string;
	data: SubnetOwner[];
};

export type SubnetOwnerResponse = {
	loading: boolean;
	error?: DataError;
	data: SubnetOwner[];
	ids: number[];
};
