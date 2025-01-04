export interface IUser {
	id?: string;
	email: string;
	phonenumber?: string;
	name?: string;
	lastname?: string;
	password?: string;
	status?: string;
	role?: string;
	image?: string;
	provider?:string;
	token?:string
};

export const emptyUser: IUser = {
	email: "",
};