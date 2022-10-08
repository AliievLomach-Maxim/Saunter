export interface IPath {
	[index: number]: IPathObj
}

interface IPathObj {
	lat: number
	lng: number
}

interface ICreatedAt {
	nanoseconds: number
	seconds: number
}

export interface IPath {
	id: string
	createdAt: ICreatedAt
	fullDescription: string
	shotDescription: string
	length: number
	paths: IPath
	title: string
	favorite: boolean
}
