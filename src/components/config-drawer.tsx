import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";


export const ConfigDrawer = ({children, renderContent, drawerTitle, drawerDescription}: {children: React.ReactNode, renderContent: React.ReactNode, drawerTitle: string, drawerDescription: string, drawerFooter: React.ReactNode}) => {
    return (
        <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>{drawerTitle}</DrawerTitle>
                <DrawerDescription>{drawerDescription}</DrawerDescription>
            </DrawerHeader>
            {renderContent}
        </DrawerContent>
        </Drawer> 
    )
}