import { InterfaceBase } from "./interface"

export default ({ children }: InterfaceBase) => {
    return <main className="flex flex-wrap">
        {children}
    </main>
}