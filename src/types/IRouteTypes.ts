import { ComponentClass, FC } from "react"

interface IRoute {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: ComponentClass | FC
    children?: IRoute[] | undefined
}

export default IRoute;