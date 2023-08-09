import { InterfaceBase } from "./interface"

export default ({ children }: InterfaceBase) => {
    return <div className="flex flex-wrap flex-col max-w-screen-xl">
        {children}
    </div>
}