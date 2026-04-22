export interface SubTab {
    id: number;
    key: string;
    name?: string;
    class: string
};

export interface TabItem {
    id: number;
    key: string;
    name: string;
    divider?: boolean;
    subList?: boolean;
    open?: boolean;
    list?: SubTab[];
    url?: string
    class?: string,
    isWorkspace?: boolean
    isMenu?: boolean;
    menu?: TabItem[]
};

const TopTabs = (workspaceId: number): TabItem[] => {
    return [
        {
            id: 1,
            key: "dashboard",
            name: "Dashboard",
            divider: false,
            subList: false,
            class: "",
            isWorkspace: true
        },
        {
            id: 2,
            key: "contacts",
            name: "Contacts",
            divider: false,
            subList: false,
            class: "",
            isWorkspace: true
        },
        {
            id: 3,
            key: "fee_module",
            name: "Fee Module",
            divider: false,
            subList: false,
            class: "",
            isWorkspace: true
        },
        {
            id: 4,
            key: "relationships",
            name: "Relationships",
            divider: false,
            subList: false,
            class: "",
            isWorkspace: true
        },
        {
            id: 5,
            key: "reports",
            name: "Reports",
            divider: false,
            subList: true,
            open: false,
            class: "",
            isWorkspace: true,
            list: [
                {
                    id: 12,
                    key: "manual_reports",
                    name: "Manual Reports",
                    class: "",
                },
                {
                    id: 13,
                    key: "auto_reports",
                    name: "Automatic Reports",
                    class: ""
                },
                {
                    id: 14,
                    key: "xero",
                    name: "Xero",
                    class: ""
                },
            ]

        },
    ]
};
const MidTabs = (workspaceId: number): TabItem[] => {

    return [
        {
            id: 6,
            key: "app_store",
            name: "App Store",
            divider: true,
            subList: false,
            class: "",
            isWorkspace: true
        },
        {
            id: 9,
            key: "settings",
            name: "Settings",
            divider: false,
            subList: false,
            class: "",
            isWorkspace: true,
            url: `/workspace/${workspaceId}/settings`,
        },
    ]
}
const EndTabs: TabItem[] = [
    {
        id: 8,
        key: "notifications",
        name: "Notifications",
        divider: false,
        subList: false,
        class: ""
    },
    {
        id: 9,
        key: "user_management",
        name: "User Management",
        divider: false,
        subList: false,
        class: ""
    },
    {
        id: 10,
        key: "templates",
        name: "Templates",
        divider: false,
        subList: false,
        class: ""
    },
    {
        id: 11,
        key: "data_ingestion",
        name: "Data Ingestion",
        divider: false,
        subList: false,
        class: "",
        isMenu: true,
        menu: [
            {
                id: 7,
                key: "import_data",
                name: "Import Data",
                class: "",
                isWorkspace: true,
                url: `/data-ingestion/new-integration`,

            },
            {
                id: 7,
                key: "integrated_data",
                name: "Integrated Data",
                class: "",
                isWorkspace: true,
                url: `/data-ingestion/integrated-data-sources`,

            },
        ]
    },
];
const sidebarTabs = (workspaceId: number) => {
    return [
        { name: TopTabs(workspaceId), divider: false },
        { name: MidTabs(workspaceId), divider: true },
        { name: EndTabs, divider: false },
    ];
}
interface Workspace {
    id: number;
    name: string;
    logo: string;
}

export interface WorkspaceProps {
    workspaces: Workspace[];
    selectedWorkspace: number | "";
    onChange: (workspaceId: number) => void;
}

export { sidebarTabs };