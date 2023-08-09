import { InterfaceBase } from "./interface"

export default ({ children }: InterfaceBase) => {
    return <main className="flex flex-wrap flex-col max-w-screen-xl">
        {children}
    </main>
}